Journal.Routers.PostsRouter = Backbone.Router.extend({
  initialize: function (rootEl, posts) {
    this.$rootEl = $(rootEl);
    this.posts = posts;
  },

  routes: {
    '': 'index',
    'posts/new': 'new',
    'posts/:id/edit': 'edit',
    'posts/:id': 'show'
  },

  index: function () {
    var view = new Journal.Views.PostIndexView({ collection: Journal.posts })
    this.$rootEl.find('#index').html(view.render().$el);
    this.fillContent();
  },

  fillContent: function () {
    if ($("#content").html() == false) {
      this.new();
    }
  },

  show: function (id) {
    var post = Journal.posts.get(id);
    var view = new Journal.Views.PostDetailView({ model: post });
    this.$rootEl.find('#content').html(view.render().$el);
  },

  edit: function (id) {
    var post = Journal.posts.get(id);
    var view = new Journal.Views.PostEditView({model: post});

    this.$rootEl.find('#content').html(view.render().$el);
  },

  new: function () {
    var post = new Journal.Models.Post();
    var view = new Journal.Views.PostEditView({model: post});

    this.$rootEl.find('#content').html(view.render().$el);
  }

});