$(function(){
    var bar = new ProgressBar.Circle(".circle-progress", {
        color: "green",
        strokeWidth: 4,
        trailColor: "#eee",
        duration: 10,
        text: {
            value: '<div class="circle-progress-btn" data-status="init"><i class="glyphicon glyphicon-play"></i></div>',
            style: {
                color: 'gray',
            },
        }
    });

    var interval, diAudio, startAudio, endAudio;
    $(".circle-progress-btn").click(function(){
        var status = $(this).data("status");
        console.log(status);
        if (status == "init"){
            diAudio = document.createElement("audio");
            diAudio.play();
            diAudio.src = "sound/di.mp3";

            startAudio = document.createElement("audio");
            startAudio.play();
            startAudio.src = "sound/start.mp3";
            startAudio.addEventListener("ended", function(){
                $(".circle-progress-btn").data("status", "pause");
                $(".circle-progress-btn").trigger("click");
            });

            endAudio = document.createElement("audio");
            endAudio.play();
            endAudio.src = "sound/end.mp3";
            endAudio.addEventListener("ended", function(){
                $("#clock-time").html($("#total-time").html());
                $(".circle-progress-btn").html('<i class="glyphicon glyphicon-play"></i>');
                $(".circle-progress-btn").data("status", "ready");
                bar.animate(0);
            });

            $(this).data("status", "ready");
            $(this).trigger("click");

        }else if (status == "ready"){
            $(this).html('<i class="glyphicon glyphicon-pause"></i>');
            $(this).data("status", "freeze");
            startAudio.play();

        }else if (status == "pause"){
            $(this).html('<i class="glyphicon glyphicon-pause"></i>');
            $(this).data("status", "play")
            clearInterval(interval);
            interval= setInterval(updateTime, 1000);
            function updateTime(){
                var total = $("#total-time").html();
                var left = $("#clock-time").html();
                var now = left - 1;
                if (now >= 0){
                    diAudio.play();
                    $("#clock-time").html(now);
                    bar.animate(1-now/total);
                }else{
                    clearInterval(interval);
                    endAudio.play();
                }
            }

        }else if (status == "play") {
            $(this).html('<i class="glyphicon glyphicon-play"></i>');
            $(this).data("status", "pause")
            clearInterval(interval);
        }
    });

});

