(function ($,Backbone,_,app) {

	var TemplateView = Backbone.View.extend({
		templateName: '',
		initialize: function () {
			this.template = _.template($(this.templateName).html());
		},
		render: function () {
			var context = this.getContext(),
				html = this.template(context);
			this.$el.html(html);
		},
		getContext: function () {
			return {}
		}
	});

	var HeaderView = TemplateView.extend({
		tagName: 'header',
		templateName: '#header-template',
		events: {
			'click a': 'changeCss'
		},
		initialize: function (options) {
			var self = this;
			TemplateView.prototype.initialize.apply(this, arguments);
			app.collections.ready.done( function () {
				app.categorys.fetch({
					success: $.proxy(self.render, self)
				});
			});
		},
        changeCss: function (event) {
            $('li a',this.$el).removeClass('active');
            var parenA=$(event.currentTarget).parent().parent().parent().children()[0];
            $(parenA).addClass('active');
            $(event.currentTarget).addClass('active');
        },
		getContext: function () {
			return {categorys:app.categorys || null};
		}
	});

    var FooterView = TemplateView.extend({
        events: {
            'click .links': 'hello',
        },
        tagName: 'footer',
        templateName: '#footer-template',
        hello: function (event) {
            event.preventDefault()
            alert('hello world' + $(event.currentTarget).text());
        }
    });

    var PostView = TemplateView.extend({
        templateName: '#post-template',
        events: {
            // 'click a.comment-reply': 'renderForm'
        },
        initialize: function (options) {
            var self = this;
            TemplateView.prototype.initialize.apply(this, arguments);
            this.postId = options.postId;
            app.collections.ready.done(function () {
                app.posts.getOrFetch(self.postId).done(function (post) {
                    self.post = post;
                    self.render()
                }).fail(function (post) {
                    self.post = post;
                    self.post.invalid = true;
                    self.render();
                });
            });
            this.render();
        },
        getContext: function () {
            return {post: this.post || null};
        },
    });



	var HomepageView = TemplateView.extend({
		templateName: '#home-template',
		events: {
			'click .prev-page': 'goToPrev',
            'click .next-page': 'goToNext'
		},
		initialize: function (options) {
			var self = this;
			TemplateView.prototype.initialize.apply(this, arguments);
			app.collections.ready.done( function () {
				app.posts.fetch({
					success: $.proxy(self.render, self)
				});
			});
		},
		render: function () {
            TemplateView.prototype.render.apply(this, arguments);
            $("html,body").animate({scrollTop:0}, 500);
		},
		getContext: function () {
			return {posts: app.posts || null};
		},
        goToPrev: function () {
            var self = this;
            if (app.posts._previous != null){
                app.posts.fetch({
                    url: app.posts._previous,
                    success : $.proxy(self.render,self)
                })
            } else {
                alert('没有更多了');
            }
        },
        goToNext: function (event) {
            var self = this;
            if (app.posts._next != null){
                app.posts.fetch({
                    url: app.posts._next,
                    success : $.proxy(self.render,self)
                })
            } else {
                alert('没有更多了');
            }
        }
	});

    var AboutView = TemplateView.extend({
        templateName: '#about-template',
        events: {},
        initialize: function (options) {
            TemplateView.prototype.initialize.apply(this, arguments);
        },
        render: function () {
            TemplateView.prototype.render.apply(this, arguments);
            $('nav a').removeClass('active');
            $('a.nav-about').addClass('active');
        },
    });

    var CategoryView = HomepageView.extend({
        initialize: function (options) {
            this.name = options.name;
            var self = this;
            TemplateView.prototype.initialize.apply(this, arguments);
            app.collections.ready.done( function () {
                app.posts.fetch({
                    url: app.apiRoot + 'posts?category=' + options.name,
                    success: $.proxy(self.render, self)
                });
            });
        },
        render: function () {
            TemplateView.prototype.render.apply(this, arguments);
            var template = _.template('<h1><%- name %></h1>');
            var view = template({name: this.name});
            $('.home',this.$el).prepend(view);
            $('nav a').removeClass('active');
            $('.category').addClass('active');
            $('.' + this.name).addClass('active');
            $('html,body').animate({scrollTop:0}, 200);
        },
        getContext: function () {
            return {posts: app.posts || null};
        },
    });

	var FormView = TemplateView.extend({
		events: {
			'submit form': 'submit',
			'click button.cancel': 'done'
		},
		errorTemplate: _.template('<span class="error"><%- msg %></span>'),
		clearErrors: function () {
			$('.error',this.form).remove();
		},
		showErrors: function(errors) {
			_.map(errors, function (fieldErrors, name) {
				var field = $(':input[name=' + name + ']',this.form),
					label = $('label[for=' + field.attr('id') + ']',this.form);
				if (label.length === 0) {
					label = $('label',this.form).first();
				}
				function appendError(msg) {
					label.before(this.errorTemplate({msg: msg}));
				}
				_.map(fieldErrors, appendError, this);
			}, this);
		},
		serializeForm: function (form) {
			return _.object(_.map(form.serializeArray(), function (item) {
				return [item.name, item.value];
			}));
		},
		submit: function (event) {
			event.preventDefault();
			this.form = $(event.currentTarget);
			this.clearErrors();
		},
		failure: function (xhr, status, error) {
			var errors = status.responseJSON;
			this.showErrors(errors);
		},
		done: function (event) {
			if (event) {
				event.preventDefault();
			}
			this.trigger('done');
			this.remove();
		},
		modelFailure: function(model, xhr, options) {
			var errors = xhr.responseJSON;
			this.showErrors(errors);
		}
	});

    var ContactView = FormView.extend({
        templateName: '#contact-template',
        submit: function (event) {
            var self = this;
            var data = {};
            FormView.prototype.submit.apply(this, arguments);
            data = this.serializeForm(this.form); // 表单数据转化成json对象
            var contact = new app.models.Contact();
            contact.set(data);
            contact.save(null,{
                success: $.proxy(self.success,self),
                error: $.proxy(self.failure, self)
            });
        },
        render: function () {
            TemplateView.prototype.render.apply(this, arguments);
            $('nav a').removeClass('active');
            $('a.nav-contact').addClass('active');
        },
        success: function(data){
            alert('发送成功！');
            this.done(); // 触发done事件
        },
        done: function (event) {
            if (event) {
                event.preventDefault();
            }
            this.trigger('done');
            this.render();
        },
    });



	app.views.HomepageView = HomepageView;
    app.views.HeaderView = HeaderView;
    app.views.FooterView = FooterView;
    app.views.PostView = PostView;
    app.views.ContactView = ContactView;
    app.views.CategoryView = CategoryView;
	app.views.AboutView = AboutView;
})(jQuery,Backbone,_,app);