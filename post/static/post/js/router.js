(function ($,Backbone,_,app) {
	var AppRouter = Backbone.Router.extend({
		routes: {
			'': 'home',
			'post/:id': 'post',
			'contact': 'contact',
			'category/:name': 'category',
			'about': 'about'
		},
		initialize: function (options) {
			this.contentElement = '#content';
			this.current = null;
			
			this.header = new app.views.HeaderView();
			$('body').prepend(this.header.el);
			this.header.render();
			
			this.footer = new app.views.FooterView();
			$('#content').after(this.footer.el);
			this.footer.render();
			
			Backbone.history.start();
		},
		home: function () {
			var view = new app.views.HomepageView({el:this.contentElement});
			this.render(view);
		},
		category: function (name) {
			var view = new app.views.CategoryView({
				el: this.contentElement,
				name: name
			});
			this.render(view);
		},
		post: function (id) {
			var view = new app.views.PostView({
				el: this.contentElement,
				postId: id
			});
			this.render(view);
		},
		about: function () {
			var view = new app.views.AboutView({el:this.contentElement});
			this.render(view);
		},
		contact: function () {
			var view = new app.views.ContactView({el: this.contentElement});
			this.render(view);
		},
		render: function (view) {
			if (this.current) {
				this.current.undelegateEvents();
				this.current.$el = $()
				this.current.remove();
			}
			this.current = view;
			this.current.render();
		}
	});

	app.router = AppRouter;
})(jQuery,Backbone,_,app);