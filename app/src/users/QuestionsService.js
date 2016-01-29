(function(){
  'use strict';

  angular.module('users')
         .service('questionsService', ['$q', QuestionsService]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function QuestionsService($q){
    
    var questions = {
       'get_question-1': {'text': 'hello world', options: [{'name': 'foo', 'value': 'bar'}]},
       'get_question-2': {'text': 'If corn oil is made from corn, what is baby oil made from?', 
       options: [
           {'name': 'foo', 'value': 'bar'}, 
           {'name':'oscar', 'value': 'wilde'}
       ]}
    };
   
    return { 
        'load': function (state) {
            return $q.when(questions[state]);
        }
    }
  }

})();
