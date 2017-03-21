(function(){
  'use strict';
  var module = angular.module('app', ['onsen']);

  module.controller('AppController', function($scope, $data) {
    $scope.doSomething = function() {
      setTimeout(function() {
        ons.notification.alert({ message: 'tapped' });
      }, 100);
    };
  });

  module.controller('tictac3x3Controller', function ($scope, $data) {
      $scope.item = $data.selectedItem;
      $scope.player1 = "Player 1";
      $scope.player2 = $scope.item.players == 1 ? "CPU" : "Player 2";
      $scope.changePlayerName = function (player) {
          if (player == 1)
              $scope.player1 = prompt("Enter name for Player 1", $scope.player1) || $scope.player1;
          else if ($scope.player2 != "CPU" && player == 2)
              $scope.player2 = prompt("Enter name for Player 2", $scope.player2) || $scope.player2;
      }
      var pending = false;
      $scope.blocks = [
          { c0: 0, c1: 0, c2: 0 },
          { c0: 0, c1: 0, c2: 0 },
          { c0: 0, c1: 0, c2: 0 }];
      var p1Turn = true;//p1 turn




      var test = [
    { e1: [0, 0], e2: [0, 1], e3: [0, 2] },
    { e1: [1, 0], e2: [1, 1], e3: [1, 2] },
    { e1: [2, 0], e2: [2, 1], e3: [2, 2] },
    { e1: [0, 0], e2: [1, 0], e3: [2, 0] },
    { e1: [0, 1], e2: [1, 1], e3: [2, 1] },
    { e1: [0, 2], e2: [1, 2], e3: [2, 2] },
    { e1: [0, 0], e2: [1, 1], e3: [2, 2] },
    { e1: [0, 2], e2: [1, 1], e3: [2, 0] }];
      var sel = {a0:[0,1,2],a1:[1,2,0],a2:[2,0,1]};
      function CPUAction1() {
          //console.log("p1Turn", p1Turn);
          var targF = false,r,c;
          for (i in test) {
              var obj = test[i];
              var ary = [obj["e1"], obj["e2"], obj["e3"]];
              //console.log("\n\n\n",ary,"\n");
              for (var i = 0; i < 3; i++) {
                  var ar = sel["a" + i];
                  var ob = ar[0];
                  //console.log(ar[0], ar[1], ar[2]);
                 // console.log(ary[ar[0]], ary[ar[1]], ary[ar[2]]);
                  if ($scope.blocks[ary[ar[0]][0]]["c" + ary[ar[0]][1]] == $scope.blocks[ary[ar[1]][0]]["c" + ary[ar[1]][1]] && $scope.blocks[ary[ar[0]][0]]["c" + ary[ar[0]][1]] == 2 && $scope.blocks[ary[ar[2]][0]]["c" + ary[ar[2]][1]] == 0)
                   {
                       r=ary[ar[2]][0], c= ary[ar[2]][1];
                       targF = true;
                       break;
                  }
              }
              if (targF)
                  break;

          }
          //console.log("targF", targF, "pending" ,pending);
          if (!targF) {
              //while (!targF && pending) {
              //    var r1 = Math.floor((Math.random() * 3)), c1 = Math.floor((Math.random() * 3));
              //    //console.log("r1", r1, "c1", c1);
              //    if ($scope.blocks[r1]["c" + c1] == 0) {
              //        r = r1, c = c1;
              //        targF = true;
              //    }
              //}
              //console.log("r", r,"c",c);
              setTimeout(CPUAction2,10);
          }
          else {
             // console.log("r", r, "c", c);
              setTimeout($scope.select, 0, r, c, 0, true);
          }

      }
      function CPUAction2() {
          //console.log("p1Turn", p1Turn);
          var targF = false, r, c;
          for (i in test) {
              var obj = test[i];
              var ary = [obj["e1"], obj["e2"], obj["e3"]];
              //console.log("\n\n\n",ary,"\n");
              for (var i = 0; i < 3; i++) {
                  var ar = sel["a" + i];
                  var ob = ar[0];
                  //console.log(ar[0], ar[1], ar[2]);
                  // console.log(ary[ar[0]], ary[ar[1]], ary[ar[2]]);
                  if ($scope.blocks[ary[ar[0]][0]]["c" + ary[ar[0]][1]] == $scope.blocks[ary[ar[1]][0]]["c" + ary[ar[1]][1]] && $scope.blocks[ary[ar[0]][0]]["c" + ary[ar[0]][1]] == 1 && $scope.blocks[ary[ar[2]][0]]["c" + ary[ar[2]][1]] == 0) {
                      r = ary[ar[2]][0], c = ary[ar[2]][1];
                      targF = true;
                      break;
                  }
              }
              if (targF)
                  break;

          }
          //console.log("targF", targF, "pending" ,pending);
          if (!targF) {
              while (!targF && pending) {
                  var r1 = Math.floor((Math.random() * 3)), c1 = Math.floor((Math.random() * 3));
                  //console.log("r1", r1, "c1", c1);
                  if ($scope.blocks[r1]["c" + c1] == 0) {
                      r = r1, c = c1;
                      targF = true;
                  }
              }
              //console.log("r", r,"c",c);
              setTimeout($scope.select, 0, r, c, 0, true);
          }
          else {
              // console.log("r", r, "c", c);
              setTimeout($scope.select, 0, r, c, 0, true);
          }

      }
      var checkWinner = function () {

          pending = false;

          for (var cn = 0; cn < 3; cn++) {

              if ($scope.blocks[cn]["c0"] == $scope.blocks[cn]["c1"] && $scope.blocks[cn]["c1"] == $scope.blocks[cn]["c2"] && $scope.blocks[cn]["c0"] != 0)
                  return $scope.blocks[cn]["c0"];
              else if ($scope.blocks[0]["c" + cn] == $scope.blocks[1]["c" + cn] && $scope.blocks[1]["c" + cn] == $scope.blocks[2]["c" + cn] && $scope.blocks[0]["c" + cn] != 0)
                  return $scope.blocks[0]["c" + cn];
          }

        if ($scope.blocks[0]["c0"] == $scope.blocks[1]["c1"] && $scope.blocks[1]["c1"] == $scope.blocks[2]["c2"] && $scope.blocks[0]["c0"] != 0)
            return $scope.blocks[0]["c0"];
        else if ($scope.blocks[0]["c2"] == $scope.blocks[1]["c1"] && $scope.blocks[1]["c1"] == $scope.blocks[2]["c0"] && $scope.blocks[0]["c2"] != 0)
            return $scope.blocks[0]["c2"];
              

          // }

              for (var r = 0; r < 3; r++) {

                  for (var c = 0; c < 3; c++) {
                      if ($scope.blocks[r]["c" + c] == 0){
                          pending = true;
                          break;
                      }
                  }
                  if (pending)
                      break;
              }
              return 0;

      }
      var winer = 0;
      $scope.startNew = function () {
          p1Turn = true, pending = false, winer = 0;
          for (var ind in $scope.blocks) {
              var obj = $scope.blocks[ind];
              for (var key in obj) {
                  obj[key] = 0;
              }
          }
      }
      $scope.select = function (row, col, val,cpu) {

          if (p1Turn || (!p1Turn && $scope.player2 != "CPU") || cpu) {
              if (!winer && $scope.blocks[row]["c" + col] == 0) {
                  $scope.blocks[row]["c" + col] = p1Turn ? 1 : 2;
                  winer = checkWinner();

                  if (winer) {
                      alert("Winner is " + (winer == 1 ? $scope.player1 : $scope.player2));
                  }
                  else {
                      if (!pending)
                          alert("Tie");
                      else if ($scope.player2 == "CPU" && p1Turn)
                          setTimeout(CPUAction1, 10);
                  }
                  p1Turn = !p1Turn;
                  try {
                      if ($scope.player2 == "CPU" && p1Turn)
                          $scope.$apply();
                  } catch (e) { console.log(e); }

              }
          }

      }
  });
  module.controller('tictac4x4Controller', function ($scope, $data) {
      $scope.item = $data.selectedItem;
      $scope.player1 = "Player 1";
      $scope.player2 = $scope.item.players == 1 ? "CPU" : "Player 2";
      $scope.changePlayerName = function (player) {
          if (player == 1)
              $scope.player1 = prompt("Enter name for Player 1", $scope.player1) || $scope.player1;
          else if ($scope.player2 != "CPU" && player == 2)
              $scope.player2 = prompt("Enter name for Player 2", $scope.player2) || $scope.player2;
      }
      var pending = false;
      $scope.blocks = [
            { c0: 0, c1: 0, c2: 0, c3: 0, c4: 0, c5: 0 },
            { c0: 0, c1: 0, c2: 0, c3: 0, c4: 0, c5: 0 },
            { c0: 0, c1: 0, c2: 0, c3: 0, c4: 0, c5: 0 },
            { c0: 0, c1: 0, c2: 0, c3: 0, c4: 0, c5: 0 },
            { c0: 0, c1: 0, c2: 0, c3: 0, c4: 0, c5: 0 },
            { c0: 0, c1: 0, c2: 0, c3: 0, c4: 0, c5: 0 }];


      var test = [
        { e1: [0, 0], e2: [0, 1], e3: [0, 2] },
        { e1: [1, 0], e2: [1, 1], e3: [1, 2] },
        { e1: [2, 0], e2: [2, 1], e3: [2, 2] },
        { e1: [0, 0], e2: [1, 0], e3: [2, 0] },
        { e1: [0, 1], e2: [1, 1], e3: [2, 1] },
        { e1: [0, 2], e2: [1, 2], e3: [2, 2] },
        { e1: [0, 0], e2: [1, 1], e3: [2, 2] },
        { e1: [0, 2], e2: [1, 1], e3: [2, 0] }];

      var sel = { a0: [0, 1, 2], a1: [1, 2, 0], a2: [2, 0, 1] };


      var test1 = [
       { e1: [0, 0], e2: [0, 1], e3: [0, 2],e4: [0, 3] },
       { e1: [1, 0], e2: [1, 1], e3: [1, 2], e4: [1, 3] },
       { e1: [2, 0], e2: [2, 1], e3: [2, 2], e4: [2, 3] },
       { e1: [3, 0], e2: [3, 1], e3: [3, 2], e4: [3, 3] },
       { e1: [0, 0], e2: [1, 0], e3: [2, 0], e4: [3, 0] },
       { e1: [0, 1], e2: [1, 1], e3: [2, 1], e4: [3, 1] },
       { e1: [0, 2], e2: [1, 2], e3: [2, 2], e4: [3, 2] },
       { e1: [0, 3], e2: [1, 3], e3: [2, 3], e4: [3, 3] },
       { e1: [0, 0], e2: [1, 1], e3: [2, 2], e4: [3, 3] },
       { e1: [0, 3], e2: [2, 1], e3: [1, 2], e4: [3, 0] }];

      var sel1 = { a0: [0, 1, 2, 3], a1: [1, 2, 3, 0], a2: [2, 3, 0, 1], a3: [3, 0, 1, 2] };



      function CPUAction1() {
          //console.log("p1Turn", p1Turn);
          var targF = false, r, c, k = 0;

          for (var l = 0; l < 4; l++) {

              for (var m = 0; m < 4; m++) {

                  for (i in test) {
                      var obj = test[i];
                      var ary = [obj["e1"], obj["e2"], obj["e3"]];
                      //console.log("\n\n\n",ary,"\n");
                      for (var i = 0; i < 3; i++) {
                          var ar = sel["a" + i];
                          var ob = ar[0];
                          //console.log(ar[0], ar[1], ar[2]);
                          // console.log(ary[ar[0]], ary[ar[1]], ary[ar[2]]);
                          if ($scope.blocks[ary[ar[0]][0]+l]["c" + (ary[ar[0]][1]+m)] == $scope.blocks[ary[ar[1]][0]+l]["c" +(ary[ar[1]][1]+m)] && $scope.blocks[ary[ar[0]][0]+l]["c" + (ary[ar[0]][1]+m)] == 2 && $scope.blocks[ary[ar[2]][0]+l]["c" + (ary[ar[2]][1]+m)] == 0) {
                              r = ary[ar[2]][0]+l, c = ary[ar[2]][1]+m;
                              targF = true;
                              break;
                          }
                      }
                      if (targF)
                          break;

                  }
                  if (targF)
                      break;
              }
              if (targF)
                  break;
          }
          //console.log("targF", targF, "pending" ,pending);
          if (!targF) {
              setTimeout(CPUAction2, 10);
          }
          else {
              // console.log("r", r, "c", c);
              setTimeout($scope.select, 0, r, c, 0, true);
          }

      }
      function CPUAction2() {
          //console.log("p1Turn", p1Turn);
          var targF = false, r, c;
          for (var l = 0; l < 4; l++) {

              for (var m = 0; m < 4; m++) {
                  for (i in test) {
                      var obj = test[i];
                      var ary = [obj["e1"], obj["e2"], obj["e3"]];
                      //console.log("\n\n\n", ary, "\n");
                      for (var i = 0; i < 3; i++) {
                          var ar = sel["a" + i];
                          var ob = ar[0];
                          //console.log(ar[0], ar[1], ar[2]);
                          //console.log(ary[ar[0]], ary[ar[1]], ary[ar[2]]);
                          if ($scope.blocks[ary[ar[0]][0] + l]["c" + (ary[ar[0]][1] + m)] == $scope.blocks[ary[ar[1]][0] + l]["c" + (ary[ar[1]][1] + m)] && $scope.blocks[ary[ar[0]][0] + l]["c" + (ary[ar[0]][1] + m)] == 1 && $scope.blocks[ary[ar[2]][0] + l]["c" + (ary[ar[2]][1] + m)] == 0) {

                         // if ($scope.blocks[ary[ar[0]][0]]["c" + ary[ar[0]][1]] == $scope.blocks[ary[ar[1]][0]]["c" + ary[ar[1]][1]] && $scope.blocks[ary[ar[0]][0]]["c" + ary[ar[0]][1]] == 1 && $scope.blocks[ary[ar[2]][0]]["c" + ary[ar[2]][1]] == 0) {
                              r = ary[ar[2]][0]+l, c = ary[ar[2]][1]+m;
                              targF = true;
                              break;
                          }
                      }
                      if (targF)
                          break;

                  }

                  if (targF)
                      break;
              }
              if (targF)
                  break;
          }


          //console.log("targF", targF, "pending" ,pending);
          if (!targF) {
              while (!targF && pending) {
                  var r1 = Math.floor((Math.random() * 6)), c1 = Math.floor((Math.random() * 6));
                  //console.log("r1", r1, "c1", c1);
                  if ($scope.blocks[r1]["c" + c1] == 0) {
                      r = r1, c = c1;
                      targF = true;
                  }
              }
              //console.log("r", r,"c",c);
              setTimeout($scope.select, 0, r, c, 0, true);
          }
          else {
              // console.log("r", r, "c", c);
              setTimeout($scope.select, 0, r, c, 0, true);
          }

      }

      function CPUAction3() {
          //console.log("p1Turn", p1Turn);
          var targF = false, r, c, k = 0;

          for (var l = 0; l < 3; l++) {

              for (var m = 0; m < 3; m++) {
                  for (i in test1) {
                      var obj = test1[i];
                      var ary = [obj["e1"], obj["e2"], obj["e3"], obj["e4"]];
                      //console.log("\n\n\n",ary,"\n");
                      for (var i = 0; i < 4; i++) {
                          var ar = sel1["a" + i];
                          var ob = ar[0];
                          //console.log(ar[0], ar[1], ar[2]);
                          // console.log(ary[ar[0]], ary[ar[1]], ary[ar[2]]);
                          if ($scope.blocks[ary[ar[0]][0] + l]["c" + (ary[ar[0]][1] + m)] == $scope.blocks[ary[ar[1]][0] + l]["c" + (ary[ar[1]][1] + m)]
                              && $scope.blocks[ary[ar[1]][0] + l]["c" + (ary[ar[1]][1] + m)] == $scope.blocks[ary[ar[2]][0] + l]["c" + (ary[ar[2]][1] + m)]

                              && $scope.blocks[ary[ar[0]][0] + l]["c" + (ary[ar[0]][1] + m)] == 2
                              && $scope.blocks[ary[ar[3]][0] + l]["c" + (ary[ar[3]][1] + m)] == 0) {
                              r = ary[ar[3]][0] + l, c = ary[ar[3]][1] + m;
                              targF = true;
                              break;
                          }
                      }
                      if (targF)
                          break;

                  }
                  if (targF)
                      break;
              }
              if (targF)
                  break;
          }
          //console.log("targF", targF, "pending" ,pending);
          if (!targF) {
              setTimeout(CPUAction4, 10);
          }
          else {
              // console.log("r", r, "c", c);
              setTimeout($scope.select, 0, r, c, 0, true);
          }

      }
      function CPUAction4() {
          //console.log("p1Turn", p1Turn);
          var targF = false, r, c;
          for (var l = 0; l < 3; l++) {

              for (var m = 0; m < 3; m++) {

                  //for (var ts in tests) {
                  //    var test = tests[ts];
                  for (i in test1) {
                      var obj = test1[i];
                      var ary = [obj["e1"], obj["e2"], obj["e3"], obj["e4"]];
                      //console.log("\n\n\n", ary, "\n");
                      for (var i = 0; i < 4; i++) {
                          var ar = sel1["a" + i];
                          var ob = ar[0];
                          //console.log(ar[0], ar[1], ar[2]);
                          //console.log(ary[ar[0]], ary[ar[1]], ary[ar[2]]);
                          if ($scope.blocks[ary[ar[0]][0] + l]["c" + (ary[ar[0]][1] + m)] == $scope.blocks[ary[ar[1]][0] + l]["c" + (ary[ar[1]][1] + m)]
                              && $scope.blocks[ary[ar[1]][0] + l]["c" + (ary[ar[1]][1] + m)] == $scope.blocks[ary[ar[2]][0] + l]["c" + (ary[ar[2]][1] + m)]

                              && $scope.blocks[ary[ar[0]][0] + l]["c" + (ary[ar[0]][1] + m)] == 1
                              && $scope.blocks[ary[ar[3]][0] + l]["c" + (ary[ar[3]][1] + m)] == 0) {
                              // if ($scope.blocks[ary[ar[0]][0]]["c" + ary[ar[0]][1]] == $scope.blocks[ary[ar[1]][0]]["c" + ary[ar[1]][1]] && $scope.blocks[ary[ar[0]][0]]["c" + ary[ar[0]][1]] == 1 && $scope.blocks[ary[ar[2]][0]]["c" + ary[ar[2]][1]] == 0) {
                              r = ary[ar[3]][0] + l, c = ary[ar[3]][1] + m;
                              targF = true;
                              break;
                          }
                      }
                      if (targF)
                          break;

                  }

                  if (targF)
                      break;
              }
              if (targF)
                  break;
          }


          //console.log("targF", targF, "pending" ,pending);
          if (!targF) {
              setTimeout(CPUAction1, 10);
          }
          else {
              // console.log("r", r, "c", c);
              setTimeout($scope.select, 0, r, c, 0, true);
          }

      }



      var p1Turn = true,
          checkWinner = function (r, c) {
          //login for nxn
          //  if ($scope.blocks[r]["c" + c] == $scope.blocks[r]["c" + (c + 1)] && $scope.blocks[r]["c" + (c + 1)] == $scope.blocks[r]["c" + (c + 2)] && $scope.blocks[r]["c" + (c)] != 0)

              // function check(r,c) {
              for (var cn = 0; cn < 4; cn++) {
                  if ($scope.blocks[r + cn]["c" + (c + 0)] == $scope.blocks[r + cn]["c" + (c + 1)] && $scope.blocks[r + cn]["c" + (c + 1)] == $scope.blocks[r + cn]["c" + (c + 2)] && $scope.blocks[r + cn]["c" + (c + 2)] == $scope.blocks[r + cn]["c" + (c + 3)] && $scope.blocks[r + cn]["c" + (c + 0)] != 0)
                      return $scope.blocks[r + 0]["c" + (c + 0)];

                  else if ($scope.blocks[r + 0]["c" + (c + cn)] == $scope.blocks[r + 1]["c" + (c + cn)] && $scope.blocks[r + 1]["c" + (c + cn)] == $scope.blocks[r + 2]["c" + (c + cn)] && $scope.blocks[r + 2]["c" + (c + cn)] == $scope.blocks[r + 3]["c" + (c + cn)] && $scope.blocks[r + 0]["c" + (c + cn)] != 0)
                      return $scope.blocks[r + 0]["c" + (c + cn)];
              }

              if ($scope.blocks[r + 0]["c" + (c + 0)] == $scope.blocks[r + 1]["c" + (c + 1)] && $scope.blocks[r + 1]["c" + (c + 1)] == $scope.blocks[r + 2]["c" + (c + 2)] && $scope.blocks[r + 2]["c" + (c + 2)] == $scope.blocks[r + 3]["c" + (c + 3)] && $scope.blocks[r + 0]["c" + (c + 0)] != 0)
                return $scope.blocks[r + 0]["c" + (c + 0)];
          else if ($scope.blocks[r + 0]["c" + (c + 3)] == $scope.blocks[r + 1]["c" + (c + 2)] && $scope.blocks[r + 1]["c" + (c + 2)] == $scope.blocks[r + 2]["c" + (c + 1)] && $scope.blocks[r + 2]["c" + (c + 1)] == $scope.blocks[r + 3]["c" + (c + 0)] && $scope.blocks[r + 0]["c" + (c + 3)] != 0)
                return $scope.blocks[r + 0]["c" + (c + 2)];

          // }
        
          for (var j = 0; j < 3; j++) {

              for (var k = 0; k < 3; k++) {
                  if ($scope.blocks[j]["c" + k] == 0) {
                      pending = true;
                      break;
                  }
              }
              if (pending)
                  break;
          }
          return 0;

      }
      var winer = 0;
      $scope.startNew = function () {
          p1Turn = true, pending = false, winer = 0;
          for (var ind in $scope.blocks) {
              var obj = $scope.blocks[ind];
              for (var key in obj) {
                  obj[key] = 0;
              }
          }
      }
      $scope.select = function (row, col, val, cpu) {

          if (p1Turn || (!p1Turn && $scope.player2 != "CPU") || cpu) {
              if (!winer && $scope.blocks[row]["c" + col] == 0) {
                  $scope.blocks[row]["c" + col] = p1Turn ? 1 : 2;
                  for (var l = 0; l < 3; l++) {

                      for (var m = 0; m < 3; m++) {
                          winer = checkWinner(l,m);
                          if (winer)
                            break;
                      }
                      if (winer)
                          break;
                  }
                  if (winer) {
                      alert("Winner is " + (winer == 1 ? $scope.player1 : $scope.player2));
                  }
                  else {
                      if (!pending)
                          alert("Tie");
                      else if ($scope.player2 == "CPU" && p1Turn)
                          setTimeout(CPUAction3, 10);
                  }
                  p1Turn = !p1Turn;
                  try {
                      if ($scope.player2 == "CPU" && p1Turn)
                          $scope.$apply();
                  } catch (e) { console.log(e); }
              }

          }


      }
  });

  module.controller('MasterController', function($scope, $data) {
    $scope.items = $data.items;
     
    $scope.showDetail = function (index) {
      var selectedItem = $data.items[index];
      $data.selectedItem = selectedItem;
        if(index==0 || index ==1)
            $scope.navi.pushPage('tictac3x3.html', { title: selectedItem.title });
        else if (index == 2 || index == 3)
            $scope.navi.pushPage('tictac4x4.html', { title: selectedItem.title });
    };
  });

  module.factory('$data', function() {
      var data = {};

      data.items = [
          {
              title: 'Single Player',
              size: 3,
              players:1
          },
          {
              title: 'Multi Player',
              size: 3,
              players: 2
          },
          {
              title: 'Single Player',
              size: 4,
              players: 1
          },
          {
              title: 'Multi Player',
              size: 4,
              players: 2
          }
      ];

      return data;
  });
})();

