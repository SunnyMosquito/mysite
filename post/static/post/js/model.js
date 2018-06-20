(function ($,Backbone,_,app) {
	function csrfSafeMethod(method) {
		return (/^(GET|HEAD|OPTIONS|TRACE)$/i.test(method));
	}

	function getCookie(name) {
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = $.trim(cookies[i]);
				if (cookie.substring(0, name.length+1) === (name + '=')) {
					cookieValue = decodeURIComponent(
						cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}

	$.ajaxPrefilter(function(settings, originalOptions, xhr) {
		var csrftoken;
		if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
			csrftoken = getCookie('csrftoken');
			xhr.setRequestHeader('X-CSRFToken', csrftoken);
		}
	});

	var Session = Backbone.Model.extend({
		defaults: {
			token: null
		},
		initialize: function (options) {
			this.options = options
			this.load();
		},
		load: function () {
			var token = localStorage.apiToken;
			if (token) {
				this.set('token', token);
			}
		},
		save: function(token) {
			this.set('token', token);
			if (token === null) {
				localStorage.removeItem('apiToken');
			} else {
				localStorage.apiToken = token;
			}
		},
		delete: function () {
			this.save(null)
		},
		authenticated: function () {
			return this.get('token') !== null;
		},
		_setupAuth: function (settings, originalOptions, xhr) {
			console.log(this.get('token'),'token');
			if (this.authenticated()) {
				xhr.setRequestHeader(
					'Authorization',
					'Token ' + this.get('token')
				);
			}
		}
	});

	var BaseModel = Backbone.Model.extend({
		url: function () {
			var links = this.get('links'),
				url = links && links.self;
			if (!url) {
				url = Backbone.Model.prototype.url.call(this);
			}
			return url;
		}
	});

	app.models.Post = BaseModel.extend({
		fetchComments: function (callback,self) {
			var links = this.get('links');
			if (links && links.comments) {
				app.comments.fetch({
					url:links.comments,
					remove: false,
					success: $.proxy(callback,self)
				});
			}
		}
	});
	app.models.Category = BaseModel.extend({});
	app.models.Contact = BaseModel.extend({
		url: app.apiRoot + 'contacts/'
	});

	var BaseCollection = Backbone.Collection.extend({
		parse: function (response) {
			if (response.results) {
				this._next = response.next;
				this._previous = response.previous;
				this._count = response.count;
				return response.results || [];
			} else {
				return response;
			}	
		},
		getOrFetch: function (id) {
			var result = new $.Deferred(),
				model = this.get('id');
			if (!model) {
				model = this.push({id: id});
				model.fetch({
					success: function (model, response, options) {
						result.resolve(model);
					},
					error: function (model, response, options) {
						result.reject(model, response);
					}
				});
			} else {
				result.resolve(model);
			}
			return result;
		}
	});

	app.collections.ready = $.getJSON(app.apiRoot);
	app.collections.ready.done(function (data) {
		app.collections.Categorys = BaseCollection.extend({
			model: app.models.Category,
			url: data.categorys
		});
		app.categorys = new app.collections.Categorys();
		
		app.collections.Posts = BaseCollection.extend({
			model: app.models.Post,
			url: data.posts
		});
		app.posts = new app.collections.Posts();
		
		app.collections.Comments = BaseCollection.extend({
			model: app.models.Comment,
			url: data.comments
		});
		app.comments = new app.collections.Comments();
	});

	app.session = new Session();
})(jQuery,Backbone,_,app);