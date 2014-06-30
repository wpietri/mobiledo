
angular.module('todo', ['ionic', 'LocalStorageModule'])

    .factory('Projects', function(localStorageService) {
        return {
            newProject: function(projectTitle) {
                // Add a new project
                return {
                    title: projectTitle,
                    tasks: []
                };
            },
            all: function() {
                var projects = localStorageService.get('projects');
                if (projects) return projects;
                return [this.newProject("work"),this.newProject("home")];
            },
            save: function(projects) {
                localStorageService.set('projects',projects);
            }
        }
    })


    .controller('TodoCtrl', function($scope, $ionicModal, Projects, $ionicSideMenuDelegate) {
        $scope.projects = Projects.all();
        $scope.$watch('projects', function() {Projects.save($scope.projects); console.log('saved')}, true);
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
