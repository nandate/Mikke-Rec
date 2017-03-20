function first_recommend(userId,db){
  var user_ref = db.ref("users/" + userId + "/selected_genres");
  var selected_genres;
  var genres_ref = db.ref("genres");
  var services_ref = db.ref("services");

  user_ref.on("value",function(snapshot){
    selected_genres = snapshot.val();
    services = [];
    candidate = [];
    genres_ref.on("value",function(snapshot){
      var genres = snapshot.val();
      for(var key in genres){
        var genre = genres[key];
        if(selected_genres.indexOf(genre.name)>=0){
          services.push.apply(services,genre.services);
        }
      }
      services_ref.on("value",function(snapshot){
        var val = snapshot.val();
        for(var key in val){
          var service = val[key];
          if(services.indexOf(service.name)>=0){
            candidate.push(service);
          }
        }
        calc_affinity(candidate,userId,db);

      });
    });
  });
}


function calc_affinity(candidate,userId,db){
  var user_ref = db.ref("users/" + userId);
  var tags_point;
  var tag = {};
  var recommends = [];
  user_ref.child("tags_point").on("value",function(snapshot){
    tags_point = snapshot.val();
    for(var key in tags_point){
      if(tags_point[key] != 0){
        tag[key] = tags_point[key];
      }
    }
    for(var key in candidate){
      var service=candidate[key];
      var service_tag = service.tags;
      var score = 0;
      for(var tag_name in tag){
        if(service_tag.indexOf(tag_name)>=0){
          score += tag[tag_name];
        }
      }
      if(score !=0){
        recommends.push({name:service.name,val:score});
      }
    }
    recommends.sort(function(a,b){
      return b.val - a.val;
    });

    console.log(recommends);

  });
}






exports.first_recommend = first_recommend;
