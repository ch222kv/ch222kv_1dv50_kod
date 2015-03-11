angular.module("demo7App").factory("EventService", EventService);

EventService.$inject = ['ResourceService', 'localStorageService', 'LocalStorageConstants', '$q'];
console.log("This");
function EventService(resourceService, localStorage, LS, $q){
    console.log("This");
    var Event = resourceService("events");
    return {
        get:function(){
            console.log("LS",LS);
            var items = localStorage.get(LS.eventsKey);

            var deferred = $q.defer();
            if(!items){
                Event.getCollection().then(function(data){
                    localStorage.set(LS.eventsKey, data);
                    console.log("data", data);
                    deferred.resolve(data);
                });
            } else {
                console.log("Getting all the events from the cache");

                deferred.resolve(items);
            }
            return deferred.promise;
        },
        clearcache: function(){
            localStorage.clearAll();
        }
    }
}