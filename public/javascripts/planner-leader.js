/**
 * File: /public/javascripts/planner-leader.js
 * Author: Patrick Quaratiello
 * 
 * Handles Agenda items
 */

//handles agenda items
 $(function() {
        var memberDiv = $('#agendaItems');
        var i = $('#agendaItems div').size() + 1;
        
        console.log("test");
        $('#addAgendaBtn').on('click', function() {
                $('<p><input type="text" id="agendaItem' + i + '"size="20" name="agendaItem' + i +'" value="" placeholder="Agenda Item" />&nbsp<input type="text" id="agendaDesc' + i + '"size="30" name="agendaDesc' + i +'" value="" placeholder="Agenda Description" />&nbsp</label><input type="button" id="rmvAgendaBtn" value="Remove"></input>').appendTo(memberDiv);
                i++;      
                return false;
        });
        
        $('body').on('click', '#rmvAgendaBtn', function() { 
                $(this).closest('p').remove();
                i--;
                return false;
        });
});
