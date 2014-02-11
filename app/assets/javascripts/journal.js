window.Journal = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Journal.Routers.PostsRouter($('#container'), Journal.posts)
    Backbone.history.start();
    Backbone.history.navigate("", { trigger: true })
  }
};

