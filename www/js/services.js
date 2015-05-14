angular.module('app.services', ['_', 's'])
    .factory('PostsRepository', ['$q', '$http', '_', 's', function($q, $http, _, s) {
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
             * http://elpatin.com/wp-json/posts?filter[posts_per_page]=3&filter[orderby]=date&filter[order]=DESC&page=XX
             *
             * Note that "page" is not in filter array.
             *
             * @param integer offset
             * @param integer limit
             * @returns {Promise}
             */
            this.getPosts = function(postsPerPage, page) {

                page = page || 1;
                postsPerPage = postsPerPage || 7;

                var baseUrl = 'http://elpatin.com/wp-json/posts';
                var url = s.sprintf('%s?filter[posts_per_page]=%d&page=%d', baseUrl, postsPerPage, page);

                //$http.get('http://elpatin.com/wp-json/posts')
                //    .success(function (posts) {
                //        $scope.posts = posts;
                //    });
            };
        };

        return new PostsRepository();
    }]);