// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('todo', ['ionic'])

    .factory('Projects', function() {
        return {
            all: function() {
                var projectString = window.localStorage['projects'];
                if(projectString) {
                    return angular.fromJson(projectString);
                }
                return [newProject("tasks")];
            },
            save: function(projects) {
                window.localStorage['projects'] = angular.toJson(projects);
            },
            newProject: function(projectTitle) {
                // Add a new project
                return {
                    title: projectTitle,
                    tasks: []
                };
            }//,
//            getLastActiveIndex: function() {
//                return parseInt(window.localStorage['lastActiveProject']) || 0;
//            },
//            setLastActiveIndex: function(index) {
//                window.localStorage['lastActiveProject'] = index;
//            }
        }
    })


    .controller('TodoCtrl', function($scope, $ionicModal, Projects, $ionicSideMenuDelegate) {
        $scope.projects = Projects.all();
        $scope.activeProject = $scope.projects[0];
        $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
            $scope.taskModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        });

        // Called when the form is submitted
        $scope.createTask = function(task) {
            $scope.activeProject.tasks.push({
                title: task.title
            });
            $scope.taskModal.hide();
            task.title = "";
        };

        // Open our new task modal
        $scope.newTask = function() {
            console.log($scope.taskModal);
            $scope.taskModal.show();
        };

        // Close the new task modal
        $scope.closeNewTask = function() {
            $scope.taskModal.hide();
        };

        $scope.toggleProjects = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.selectProject = function(project, index) {
            $scope.activeProject = project;
//            Projects.setLastActiveIndex(index);
            $ionicSideMenuDelegate.toggleLeft(false);
        };

        var createProject = function(projectTitle) {
            var newProject = Projects.newProject(projectTitle);
            $scope.projects.push(newProject);
            Projects.save($scope.projects);
            $scope.selectProject(newProject, $scope.projects.length-1);
        };


        $scope.newProject = function() {
            var projectTitle = prompt('Project name');
            if(projectTitle) {
                createProject(projectTitle);
            }
        };


    });
/*

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


*/
