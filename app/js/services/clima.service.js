(function(){
  'use strict';

  angular.module("atividade").service("ClimaService",ClimaService);

  ClimaService.$inject = [
    'Restangular',
    '$q'
  ];

  function ClimaService(
    Restangular,
    $q
  ){

    var sm;

    sm                      = this;
    sm.obterClimaPorCidade  = obterClimaPorCidade;

    function obterClimaPorCidade(Cidade){
      var deferred;

      deferred = $q.defer();

      Restangular.all('2.5').customGET("forecast",{q:Cidade}).then(function(data){
        deferred.resolve(data);
      }).catch(function(error){
        deferred.reject(error);
      });
    
      return deferred.promise;
    }

  }

})();