Journal.Views.PostEditView = Backbone.View.extend({
  template: JST['posts/form'],

  initialize: function () {
    this.$el = $("<content></content>");
  },

  events: {
    'submit .post-form': 'savePost'
  },

  render: function () {
    var content = this.template({ post: this.model });
    this.$el.html(content);
    return this;
  },

  savePost: function (event) {
    event.preventDefault();
    var id = $(event.currentTarget).attr("data-id");
    var formData = $(event.currentTarget).serializeJSON().post;
    var post;
    var that = this;

    if (id) {
      post = Journal.posts.get(id);
      post.save(formData, {
        wait: true,
        success: function () { Backbone.history.navigate("", { trigger: true }) },
        error: function (model, response) { that.$el.prepend($("<h3>" + response.responseText + "</h3>" )) }
      });
    } else {
      post = new Journal.Models.Post(formData)
      Journal.posts.create(post, {
        wait: true,
        success: function () { Backbone.history.navigate("", { trigger: true }) },
        error: function (model, response) { that.$el.prepend($("<h3>" + response.responseText + "</h3>" )) }
      });
    }
  }
});