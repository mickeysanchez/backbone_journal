Journal.Views.PostDetailView = Backbone.View.extend({
  template: JST['posts/detail'],

  initialize: function () {
    this.$el = $("<content></content>");
  },

  render: function () {
    var content = this.template({ post: this.model });

    this.$el.html(content);
    return this;
  }
});