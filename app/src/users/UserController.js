(function(){

  angular
       .module('users')
       .controller('UserController', [
          'userService', 'workflowService', '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$fsm',
          UserController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function UserController( userService, workflowService, $mdSidenav, $mdBottomSheet, $log, $q, $fsm) {

    var self = this;

    vm.selected     = null;
    vm.users        = [ ];
    vm.selectUser   = selectUser;
    vm.toggleList   = toggleUsersList;
    vm.makeContact  = makeContact;

    vm.tabs = [
      { title: 'One', content: "Tabs will become paginated if there isn't enough room for them."}
    ];

    vm.selected = null;
    vm.previous = null;
    vm.nextTab = nextTab;

    function nextTab() {
      title = 'ANother Tab  ';
      view = 'asdflkhas dkofjha lsdkjfhasd ';
      vm.tabs.push({ title: title, content: view, disabled: false});
    };

    // Load all registered users

    userService
          .loadAllUsers()
          .then( function( users ) {
            vm.users    = [].concat(users);
            vm.selected = users[0];
          });
          

    // *********************************
    // Internal methods
    // *********************************

    /**
     * Hide or Show the 'left' sideNav area
     */
    function toggleUsersList() {
      $mdSidenav('left').toggle();
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectUser ( user ) {
      vm.selected = angular.isNumber(user) ? $scope.users[user] : user;
    }

    /**
     * Show the Contact view in the bottom sheet
     */
    function makeContact(selectedUser) {

        $mdBottomSheet.show({
          controllerAs  : "cp",
          templateUrl   : './src/users/view/contactSheet.html',
          controller    : [ '$mdBottomSheet', ContactSheetController],
          parent        : angular.element(document.getElementById('content'))
        }).then(function(clickedItem) {
          $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * User ContactSheet controller
         */
        function ContactSheetController( $mdBottomSheet ) {
          this.user = selectedUser;
          this.actions = [
            { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
            { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
            { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
            { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
          ];
          this.contactUser = function(action) {
            // The actually contact process has not been implemented...
            // so just hide the bottomSheet

            $mdBottomSheet.hide(action);
          };
        }
    }

  }

})();
