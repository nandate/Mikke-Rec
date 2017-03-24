function first_recommend(userId,db){
  var user_ref = db.ref("users/" + userId + "/selected_genres");
  var selected_genres;
  var genres_ref = db.ref("genres");
  var services_ref = db.ref("services");

  user_ref.on("value",function(snapshot){
    selected_genres = snapshot.val();
    services = [];
    candidate = [];

    for(var key in selected_genres){
      services.push.apply(services,selected_genres[key].services);
    }
    console.log(services);
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
}


function calc_affinity(candidate,userId,db){
  var user_ref = db.ref("users/" + userId);
  var tags_point;
  var tag = {};
  var recommends = [];
  var result = [];
  user_ref.child("tags_point").on("value",function(snapshot){
    tags_point = snapshot.val();
    for(var key in tags_point){
      if(tags_point[key] != 0){
        tag[key] = tags_point[key];
      }
    }
    for(var key in candidate){
      var service = candidate[key];
      var service_tag = service.tags;
      var score = 0;
      for(var tag_name in tag){
        if(service_tag.indexOf(tag_name)>=0){
          score += tag[tag_name];
        }
      }
      if(score !=0){
        recommends.push({name:service.name,val:score,data:service});
      }
    }

    recommends.sort(function(a,b){
      return b.val - a.val;
    });

    if(recommends.length>3){
      for(var i=0;i<3;i++){
        result.push(recommends[i].data);
      }
    }else{
      for(var i=0;i<recommends.length;i++){
        result.push(recommends[i].data);
      }
    }
    console.log(recommends);
    console.log(result);
    user_ref.child("recommends").set(result);
    user_ref.child("used_services").set(result);
  });
}




exports.first_recommend = first_recommend;
