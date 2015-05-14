angular.module('app.services', ['_'])
    .factory('PostsRepository', ['$q', '$http', function($q, $http) {
        var PostsRepository = function() {

            var posts = {};

            this.getPost = function(id) {

                var deferred = $q.defer();

                if (posts[id]) {
                    deferred.resolve(posts[id]);
                } else {
                    $http.get('http://elpatin.com/wp-json/posts/' + id)
                        .success(function (post) {
                            posts[id] = post;
                            deferred.resolve(post);
                        });
                }

                return deferred.promise;
            };

            /**
             * Always look for posts ordered by publish date descendant.
             *
             * @param integer offset
             * @param integer limit
             * @returns {Promise}
             */
            this.getPosts = function(offset, limit) {

            };
        };

        return new PostsRepository();
    }]);