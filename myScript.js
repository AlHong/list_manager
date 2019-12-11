var dropBox;
var output;
var file;
var jsonObj;
var app;
var tasks = []; //tasks in to-do list
var completedTasks = []; 

var taskNumber = 0;

var isDuplicateTask = false;


app = angular.module("toDoListApp",[]);
app.filter('removeDuplicates', function(){
	return function(taskTitle){
		for(var i = 0; i < tasks.length; i++)
		{
			if(taskTitle===tasks[i].Name)
			{
				alert("Your task is already on the to-do list");
				//remove duplicate tasks in to-do list
				isDuplicateTask = true;

				break;
			}
		}
	};
});

/*
	custom service: 
	Remove completed tasks (check marked)
	display	onto a separate complete list.
*/
/*
app.factory('moveCompletedService', function(){
	var factory = {};

	factory.moveCompleted = function(){
		for(var i = 0; i < tasks.length; i++)
		{
			var checkboxID = tasks[i].checkboxID;
			var rowID = tasks[i].rowID;
			var taskName = tasks[i].Name; 
			var isComplete = tasks[i].Complete;
			var taskDesc = tasks[i].Description;

			var checkbox = document.getElementById(checkboxID);

			if(checkbox.checked)
			{ 
				deleteTask(rowID);

				tasks.splice(i,1);

				completedTasks.push({checkboxID: checkboxID, rowID: rowID, Name: taskName, Complete: true, Description : taskDesc});

				var buttonHtml = "<button type='button' class='btn btn-primary' onclick='deleteTask(" + rowID + ")'>Delete</button>";
			    	
			    var taskRowHtml = "<tr id='" + rowID + "'><td>" + taskName + "</td><td><input type='checkbox' style='display: inline-block;' name='isComplete' id='"+ checkboxID + "' checked></td><td>" + taskDesc + "</td><td>"+ buttonHtml +"</td></tr>"; 
					
					
				document.getElementById("completedList").innerHTML += taskRowHtml;

			}
		}
	}

	return factory;
});
*/

app.service('moveCompletedService', function(){
	this.moveCompleted = function(){
		
			for(var i = 0; i < tasks.length; i++)
			{
				var checkboxID = tasks[i].checkboxID;
				var rowID = tasks[i].rowID;
				var taskName = tasks[i].Name; 
				var isComplete = tasks[i].Complete;
				var taskDesc = tasks[i].Description;

				var checkbox = document.getElementById(checkboxID);

				if(checkbox.checked)
				{ 
					deleteTask(rowID);

					tasks.splice(i,1);

					completedTasks.push({Checkbox: checkboxID, Row: rowID, Name: taskName, Complete: true, Description : taskDesc});

					var buttonHtml = "<button type='button' class='btn btn-primary' onclick='deleteTask(" + rowID + ")'>Delete</button>";
				    	
				    var taskRowHtml = "<tr id='" + rowID + "'><td>" + taskName + "</td><td><input type='checkbox' style='display: inline-block;' name='isComplete' id='"+ checkboxID + "' checked></td><td>" + taskDesc + "</td><td>"+ buttonHtml +"</td></tr>"; 
						
						
					document.getElementById("completedList").innerHTML += taskRowHtml;

				}
			}
		
	}
});

app.controller("AngularController", function($scope, moveCompletedService) {
	//$scope.taskArray = tasks;

	moveCompletedService.moveCompleted();
});




/*
app.controller("AngularController", function($scope) {

	//$scope.jsonData = jsonObj.todo;

	
	$scope.jsonData = [
				{
					"task":"buy groceries",
					"complete":true, 
					"description":"go to supermarket"
				}
			];
	
});
*/


/*
app.controller("AngularController", function($scope, $http) {
	$http.get("todo.json").then(function(response))
	{	        
		$scope.jsonData = response.data.records;
	
	}     
});
*/

//moves completed/checkmarked tasks in to-do list to completed list
function moveCompletedTasks()
{	
	var checkedString = "";

			for(var i = 0; i < tasks.length; i++)
			{
				var checkboxID = tasks[i].Checkbox;
				var rowID = tasks[i].Row;
				var taskName = tasks[i].Name; 
				var isComplete = tasks[i].Complete;
				var taskDesc = tasks[i].Description;
				var isChecked;
				//var isChecked = document.getElementById(checkboxID).checked;
				isChecked = $('#'+checkboxID).is(":checked");
				//isChecked = document.getElementById(checkboxID).prop("checked");

				if(isChecked)
				{ 
					deleteTask(rowID);

					tasks.splice(i,1);

					completedTasks.push({Checkbox: checkboxID, Row: rowID, Name: taskName, Complete: true, Description : taskDesc});

					var buttonHtml = "<button type='button' class='btn btn-primary' onclick='deleteTask(" + rowID + ")'>Delete</button>";
				    	
				    var taskRowHtml = "<tr id='" + rowID + "'><td>" + taskName + "</td><td><input type='checkbox' style='display: inline-block;' name='isComplete' id='"+ checkboxID + "' checked></td><td>" + taskDesc + "</td><td>"+ buttonHtml +"</td></tr>"; 
						
						
					document.getElementById("completedList").innerHTML += taskRowHtml;

				}

				checkedString += "checkbox " + checkboxID + ": " + isChecked + "\n";
			}	

			//alert(checkedString);
}



function deleteTask(row)
{
	row.innerHTML = "";
}

function isComplete(checkboxID)
{
	var checkbox = document.getElementById(checkboxID);
	var rowID = "task" + checkboxID;
	var row = document.getElementById(rowID);

	//move to completed list
	if(checkbox.checked)
	{
		//alert(checkbox.id + ": checked");
		
		row.innerHTML = "";

		var index = 0;

		//search for index
		for(var i = 0; i < tasks.length; i++)
		{
			if(tasks[i].Checkbox === checkboxID)
			{
				index = i;
				break;
			}
		}

		var taskName = tasks[index].Name;
		var taskDesc = tasks[index].Description;

		tasks.splice(index,1);

		/*
		var index = parseInt(checkboxID);
		*/

		completedTasks.push({Checkbox: checkboxID, Row: rowID, Name: taskName, Complete: true, Description : taskDesc});

		var buttonHtml = "<button type='button' class='btn btn-primary' onclick='deleteTask(" + row + ")'>Delete</button>";
				    	
		var taskRowHtml = "<tr id='" + rowID + "'><td>" + taskName + "</td><td><input type='checkbox' style='display: inline-block;' name='isComplete' id='"+ checkboxID + "' checked></td><td>" + taskDesc + "</td><td>"+ buttonHtml +"</td></tr>"; 
						
						
		document.getElementById("completedList").innerHTML += taskRowHtml;
		

	}

	/*
	else
	{
		alert(checkbox.id + ": unchecked");
	}
	*/
}

function addTask()
{
	var taskName = document.getElementById("taskTitle").value;
	var taskDesc = document.getElementById("taskDescription").value;

	if(isDuplicateTask)
	{
		isDuplicateTask = false;
		return;
	}

	//don't add task if taskName is in tasks
	for(var i = 0; i < tasks.length; i++)
	{
		if(taskName === tasks[i].Name)
		{
			return;
		}
	}

	var rowID = "task" + taskNumber;
    var checkboxID = "" + taskNumber;
    taskNumber++;

	tasks.push({Checkbox: checkboxID, Row: rowID, Name: taskName, Complete: false, Description : taskDesc});

	var buttonHtml = "<button type='button' class='btn btn-primary' onclick='deleteTask(" + rowID + ")'>Delete</button>";
    	
    var taskRowHtml = "<tr id='" + rowID + "'><td>" + taskName + "</td><td><input type='checkbox' onclick='isComplete("+ checkboxID + ");' style='display: inline-block;' name='isComplete' id="+ checkboxID + "></td><td>" + taskDesc + "</td><td>"+ buttonHtml +"</td></tr>"; 
		
		
	document.getElementById("toDoList").innerHTML += taskRowHtml;

	var isCheckedRows = "";

	/*
	for(var i = 0; i < tasks.length; i++)
	{
		var id = "" + i;
		var isComplete = tasks[i].Complete;
		document.getElementById(id).checked = isComplete;
		
		isCheckedRows += isComplete + "\n";
		
	}	
	*/
	//removeDuplicateTasks();

	moveCompletedTasks();
}







function printList()
{
	var taskName, isComplete, taskDesc;
	var taskRowsHtml = ""; //rows in to-do list
	var completeTaskRowsHtml = "";
	var rowID;
	var checkboxID; 


	for(var i = 0; i < jsonObj.todo.length; i++)
	{
		taskName = jsonObj.todo[i].task; 
		isComplete = jsonObj.todo[i].complete;
		taskDesc = jsonObj.todo[i].description;

		rowID = "task" + taskNumber;
    	checkboxID = "" + taskNumber;
    	taskNumber++;

    	var buttonHtml = "<button type='button' class='btn btn-primary' onclick='deleteTask(" + rowID + ")'>Delete</button>";

    	if(isComplete)
    	{	
    		completedTasks.push({Checkbox: checkboxID, Row: rowID, Name: taskName , Complete: isComplete, Description : taskDesc});
    		//taskRowHtml = "<tr id='" + rowID + "'><td>" + taskName + "</td><td><input type='checkbox' onclick='isComplete()' style='display: inline-block;' name='isComplete' id='"+ checkboxID + "'></td><td>" + taskDesc + "</td><td>"+ buttonHtml +"</td></tr>"; 
    		completeTaskRowsHtml += "<tr id='" + rowID + "'><td>" + taskName + "</td><td><input type='checkbox' style='display: inline-block;' name='isComplete' id="+ checkboxID + " checked></td><td>" + taskDesc + "</td><td>"+ buttonHtml +"</td></tr>"; 
    	}

    	else
		{
			tasks.push({Checkbox: checkboxID, Row: rowID, Name: taskName , Complete: isComplete, Description : taskDesc});
			taskRowsHtml += "<tr id='" + rowID + "'><td>" + taskName + "</td><td><input type='checkbox' onclick='isComplete("+ checkboxID + ");' style='display: inline-block;' name='isComplete' id="+ checkboxID + "></td><td>" + taskDesc + "</td><td>"+ buttonHtml +"</td></tr>";  	
    	}
    	 	
    }


	document.getElementById("toDoList").innerHTML += taskRowsHtml;
	document.getElementById("completedList").innerHTML += completeTaskRowsHtml;

	/*
	for(var i = 0; i < tasks.length; i++)
	{
		//taskNumber = i;
		//var id = "checkbox" + taskNumber;

		var checkboxID = "checkbox" + i;
		//isComplete = jsonObj.todo[i].complete;
		isComplete = tasks[i].Complete;
		document.getElementById(checkboxID).checked = isComplete;
	}
	*/
}

function showList()
{
	output = [];
	var reader = new FileReader();

 	reader.onload = function(event)
    {
        var contents = event.target.result;
        var lines = contents.split(/[\r\n]+/g);

        for(var i = 0; i < lines.length; i++) 
        {		
			output.push(lines[i]);  	  
        }
     

        jsonObj = JSON.parse(output.join(''));

        printList();
    };

	reader.readAsText(file);
}

function removeDuplicateTasks()
{
	var uniqueTasks = [];

	/*
	$.each(tasks, function(i, el){
		if($.inArray(el, uniqueTasks) === -1) 
		{
		    uniqueTasks.push(el);
		}
	});
	*/

	for(var i = 0; i < tasks.length; i++)
	{
		//if task is not in unique tasks
		if(!uniqueTasks.includes(tasks[i]))
		{
			uniqueTasks.push(tasks[i]);
		}
	}

	tasks = uniqueTasks;




	//print table
	var taskRowsHtml = "";
	document.getElementById("toDoList").innerHTML = "<tr><th>Task</th><th>Complete</th><th>Description</th></tr>";

	for(var i = 0; i < tasks.length; i++)
	{
		var checkboxID = tasks[i].checkboxID;
		var rowID = tasks[i].rowID;
		var taskName = tasks[i].Name; 
		var isComplete = tasks[i].Complete;
		var taskDesc = tasks[i].Description;

    	var buttonHtml = "<button type='button' class='btn btn-primary' onclick='deleteTask(" + rowID + ")'>Delete</button>";
    	
    	taskRowsHtml += "<tr id='" + rowID + "'><td>" + taskName + "</td><td><input type='checkbox' style='display: inline-block;' name='isComplete' id='"+ checkboxID + "'></td><td>" + taskDesc + "</td><td>"+ buttonHtml +"</td></tr>"; 
	}


	document.getElementById("toDoList").innerHTML += taskRowsHtml;


	for(var i = 0; i < tasks.length; i++)
	{
		//taskNumber = i;
		//var id = "checkbox" + taskNumber;

		var checkboxID = "" + i;
		//isComplete = jsonObj.todo[i].complete;
		isComplete = tasks[i].Complete;
		document.getElementById(checkboxID).checked = isComplete;
	}
}

window.onload =	function(){
	dropBox = document.getElementById("fileDropArea");
	dropBox.ondragenter = ignoreDrag;
	dropBox.ondragover = ignoreDrag;
	dropBox.ondrop = drop;
}

function ignoreDrag(e)	
{
	e.stopPropagation();
	e.preventDefault();
}

function drop(e)	
{
	e.stopPropagation();	 
	e.preventDefault();
	
	var data = e.dataTransfer;
	var files =	data.files;
		
	
	file = files[0];

	showList();
}


function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}


function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'todo.json', true);

    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };

    xobj.send(null);
}

function init() {
    loadJSON(function(response) {
        // Parse JSON string into object
        var actual_JSON = JSON.parse(response);
        return actual_JSON;
    });
}

function GetJSONText(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}