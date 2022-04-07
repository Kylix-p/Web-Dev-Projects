var Sudoku = {

    //-------------------------------GAME DATA---------------------------------
    //the Sudoku game data, game can be different if the data changes
    matrix:[  [[7],[],[],[9],[],[5],[],[3],[]],
        [[],[3],[],[2],[],[6],[],[],[4]],
        [[],[],[],[7],[],[8],[],[9],[]],
        [[6],[],[7],[1],[],[3],[],[2],[]],
        [[],[8],[],[],[],[],[4],[1],[3]],
        [[3],[],[],[4],[],[2],[],[],[6]],
        [[4],[],[3],[],[6],[1],[],[5],[7]],
        [[],[7],[],[3],[],[],[],[6],[]],
        [[],[],[],[5],[],[],[3],[],[]]
    ],

    //-----------------------------START FUNCTION-------------------------------
    //render game board and input Sudoku numbers
    start: function(){

        //render game board
        for (var i = 0; i < 9; i++) {
            var row = $('<tr></tr>');
            for(var j = 0; j < 9; j++){
                var sBlock = $('<td class="sBox edit"></td>');
                sBlock.attr('id','Block'+'_'+ i + '_' + j).text(Sudoku.matrix[i][j]);   //store the block location in the id
                row.append(sBlock);
                if(Sudoku.matrix[i][j] != ''){  //the number in block with edit class can be changed
                    sBlock.removeClass('edit');
                }
                var groups = Math.floor(Math.sqrt(9));  //use different color to distinguish different groups
                var gA = Math.floor(i / groups);
                var gB = Math.floor(j / groups);
                if (gA % 2 == gB % 2) {
                    sBlock.addClass('sGroup');
                }else{
                    sBlock.addClass('sGroup2');
                }
            $('#sTable').append(row);
            }
        }
        
    },

    //------------------------------------PLAY FUNCTION-------------------------
    //handle click event in the game playing
    play : function(){
        $('.sBox').click(function(event){   //if the block in the table been clicked
            event.stopPropagation();
            if($(this).hasClass('edit') == true){   //if it's a editable block
                $('.selectActive').removeClass('selectActive');
                $(this).addClass('selectActive');
                if (!navigator.userAgent.match(/mobile/i)) {    //if it's not a mobile device, show select panel around where the event happens
                    $('.select').css('top',event.pageY).css('left',event.pageX).addClass('active');
                }else{                                          //if it's a mobile device, always show the select panel in the middle
                    $('.select').css('top','40%').css('left','50%').addClass('active');
                }
            }
        });

        $('.select div').click(function(){  //if the select panel been clicked
            var thisInput = $(this).text();
            var location = $('.selectActive').attr('id').split('_');    //analyze the id to get the location of the block selected
            var thisRow = parseInt(location[1]);    //the x-axis of the block
            var thisCol = parseInt(location[2]);    //the y-axis of the block
            Sudoku.matrix[thisRow][thisCol] = parseInt(thisInput);  //update the input to the data matrix

            //check the number input
            $('.sWrong').removeClass('sWrong');
            Sudoku.compare();   //check the input by calling the compare function

            //after select a number
            $('.selectActive').text(parseInt(thisInput));            //set the number to block
            $('.selectActive').removeClass('selectActive');
            $('.select').removeClass('active');
        });

        $('html').click(function(){     //the user can click any other part of the page (like background) to close the select panel
            $('.selectActive').removeClass('selectActive');
            $('.select').removeClass('active');
        })

    },

    //--------------------------------COMPARE FUNCTION--------------------------
    //compare numbers on the board to find potential mistake
    compare : function(){
        var matrix = Sudoku.matrix;
         for(var i=0; i<9; i++){
             for(var j=0; j<9; j++){
                 for(var h=0; h<9; h++){
                     if(
                         (matrix[i][j] == matrix[i][h] && j != h)   //valid rows in Sudoku rules
                         || (matrix[i][j] == matrix[h][j] && i != h)    //valid cols in Sudoku rules
                       ){
                         $('#Block_'+i+'_'+j).addClass('sWrong');   //if the number is wrong, show it with a red background
                     };
                 for(var k = 0; k < 3; k++) //valid groups in Sudoku rules
                     for(var l = 0; l < 3; l++)
                         if(
                            (matrix[i][j] == matrix[parseInt(i / 3) * 3 + k][parseInt(j / 3) * 3 + l])
                            && (!(i == parseInt(i / 3) * 3+k && j == parseInt(j / 3) * 3+l))
                            ){
                                 $('#Block_'+i+'_'+j).addClass('sWrong');
                             };
                 }
             }
         }
    }
};

$(document).ready(function(){
    Sudoku.start();
    Sudoku.play();
});
document.querySelector( '#refresh').addEventListener('click',function(){
    window.location.reload();
});
document.querySelector( '#repeat').addEventListener('click',function(){
    window.location.repeat();
});
document.querySelector( '#undo').addEventListener('click',function(){
    window.location.reload();
});