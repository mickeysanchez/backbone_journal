Journal.Views.PostDetailView = Backbone.View.extend({
  template: JST['posts/detail'],

  initialize: function () {
    this.$el = $("<content></content>");
  },

  events: {
    'dblclick #post-title': 'showTitleEdit',
    'dblclick #post-body': 'showBodyEdit',
    'submit #title-change': 'saveUpdate',
    'submit #body-change': 'saveUpdate'
  },

  render: function () {
    var content = this.template({ post: this.model });

    this.$el.html(content);
    return this;
  },

  showTitleEdit: function (event) {
    var target = event.currentTarget;
    var oldTitle = $(target).html();
    var id = $(target).attr("data-id");
    $(target).html("<form data-id='" + id + "' id='title-change'><input name=post[title] value='" + oldTitle + "'></form>");
  },

  showBodyEdit: function (event) {
    var target = event.currentTarget;
    var oldBody = $(target).html();
    var id = $(target).attr("data-id");
    $(target).html("<form data-id='" + id + "' id='body-change'><textarea name=post[body]>" + oldBody + "</textarea><input type='submit' value='update' /></form>");
  },

  saveUpdate: function (event) {
    event.preventDefault();
    var id = $(event.currentTarget).attr("data-id");
    var formData = $(event.currentTarget).serializeJSON().post;

    var post = Journal.posts.get(id);
    post.save(formData, {
      wait: true,
      success: function (resp) { Backbone.history.navigate("#/posts/" + id, {trigger: true}) }
    });
  }
});