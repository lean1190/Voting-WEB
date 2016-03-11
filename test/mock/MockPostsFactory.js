/**
 * @ngdoc provider
 * @name mock.posts:PostsFactory
 * @description
 * Mock para el factory de posts
 * Simplemente crea una respuesta a un requirimiento como si lo resolviera el factory real.
 */

angular.module("mock.posts", []).provider("PostsFactory", function () {
    "use strict";

    this.$get = function ($q) {
        var postsFactory = {};

        postsFactory.bringThatPost = function (postId) {
            for (var i = 0; i < this.posts.length; i++) {
                if (this.posts[i].$id === postId) {
                    return this.posts[i];
                }
            }
        };

        postsFactory.posts = [
            {
                $id: 1,
                title: "one title",
                post: "one content",
                category: "one",
                likes: 0,
                owner: 19024871057,
                done: false,
                whoLikesMe: {}
        },
            {
                $id: 2,
                title: "two title",
                post: "two content",
                category: "two",
                likes: 0,
                owner: 25525235231902487,
                done: false,
                whoLikesMe: {}
        },
            {
                $id: 3,
                title: "three title",
                post: "three content",
                category: "two",
                likes: 0,
                owner: 6373737373321,
                done: true,
                whoLikesMe: {}
        }
    ];

        postsFactory.addPost = function (title, post, category, facebookId) {
            this.posts.push({
                title: title,
                post: post,
                category: category,
                owner: facebookId
            });

            return $q.when();
        };

        postsFactory.findAllPosts = function () {
            return $q.when(this.posts);
        };

        postsFactory.findPostsByCategory = function (category) {
            return $q.when(this.posts.filter(function (currentPost) {
                return currentPost.category === category;
            }));
        };

        postsFactory.addLike = function (postId, userId) {
            var post = this.bringThatPost(postId),
                userHash = userId.hashCode();
            post.likes++;
            post.whoLikesMe[userHash] = userId;

            return $q.when();
        };

        postsFactory.deletePost = function (postId) {
            this.posts = this.posts.filter(function (currentPost) {
                return currentPost.$id !== postId;
            });

            return $q.when();
        };

        postsFactory.markDone = function (postId) {
            this.bringThatPost(postId).done = true;

            return $q.when();
        };

        postsFactory.markNotDone = function (postId) {
            this.bringThatPost(postId).done = false;

            return $q.when();
        };


        return postsFactory;
    };
});
