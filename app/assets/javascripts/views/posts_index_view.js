Journal.Views.PostIndexView = Backbone.View.extend({
  template: JST['posts/index'],

  initialize: function () {
    this.$el = $("<content></content>");
    this.listenTo(this.collection, "add remove reset change route", this.render)
  },

  events: {
    'click button.delete-post': 'deletePost'
  },

  render: function () {
    var content = this.template({ posts: this.collection.models });
    this.$el.html(content);
    return this;
  },

  deletePost: function (event) {
    var $button = $(event.currentTarget);
    var targetId = $button.attr("data-id");
    var targetPost = this.collection.get(targetId);
    targetPost.destroy({
      wait: true,
      error: function () {console.log("error in delete post")}
    });

  }
});