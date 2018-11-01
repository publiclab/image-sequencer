      //JavaScript I have Coded Starts from Here.........................
      window.onscroll = function() {scrollFunction()};

      function scrollFunction() {
          if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
              document.getElementById("scroll_to_top").style.display = "block";
          } else {
              document.getElementById("scroll_to_top").style.display = "none";
          }
          function topFunction() {
            document.documentElement.scrollTop = 0; }
      }
      //And Ends Here
