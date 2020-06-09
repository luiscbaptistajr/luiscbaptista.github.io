
// initialize app
var App = App || {};

// define model structure
App.ArticleModel = Backbone.Model.extend();

// load data from api
App.ArticleCollection = Backbone.Collection.extend({

	// assign desired model structure
	model: App.ArticleModel,

	// specify location of api
	url: 'http://jollisoft.com/api/news?source=gma&categories=latest',

	// locate list of articles
	parse: function(response) {
		return response.data.latest;
	},


	// same domain policy
	sync: function(method, model, options) {
        var that = this;
            var params = _.extend({
                type: 'GET',
                dataType: 'jsonp',
                url: that.url,
                processData: false
            }, options);

        return $.ajax(params);
    }

});

App.ArticlesView = Backbone.View.extend({

	// root element of this view; reference via this.el
	tagName: 'ul',

	// called during new App.ArticlesView();
	initialize: function() {

		var instance = this;
		instance.collection = new App.ArticleCollection();
		instance.collection.fetch({
			success: function () {
				instance.render();
			}
		});
	},

	render: function() {

		$(this.el).attr('data-role', 'listview').attr('data-inset', 'true');

		var articles = this.collection.toJSON();
		
		// iterate all items in array 
		_.each(articles, function(item){

			var itemView = new App.ArticleItemView({model:item});
			$(this.el).append(itemView.render().el);

		}, this);

		

		return this;
	}
});

App.ArticleItemView = Backbone.View.extend({

	tagName: 'li',
	events: {

		"click": 'onClick'

	},

	render: function() {

		var listHeader = $("li:first").attr('data-role', 'list-divider').text("News Today").addClass('list-header') ;
		var listLink = $("<a/>").attr('href', '#page2').attr('data-transition', 'slide');
		var iconImg = $("<img />").attr('src', this.model.image);
		var titleLink = $("<p/>").html(this.model.title);
		
		$(this.el).appendTo(listHeader);
		// $(this.el).append(iconImg);
		$(this.el).addClass('list-news');
		$(this.el).append(listLink);
		$(listLink).append(iconImg);
		$(listLink).append(titleLink);

		// $(this.el).attr("data-transition", "slide");

		return this;
	},

	onClick: function() {
		// console.log(this.model);
		var articleView = new App.ArticleDetailView({model:this.model});
		$('.article-detail-view').html(articleView.render().el);
	}

});

App.ArticleDetailView = Backbone.View.extend({

	tagName: 'div',

	initialize: function(){
		console.log(this.model);
	},

	render: function(){

		var articleContent = $(this.el).attr('data-role', 'content');
		// var articleHeader = $('<div/>').attr('data-role', 'header').text("Article");

		$(articleContent).insertBefore($('.header'));
		
		var title = $('<h2/>').html(this.model.title);
		// var creator = $('<span/>').html(this.model.creator);
		var desc = $('<p/>').html(this.model.description.replace(/\n/g, '<br /><br />'));
		var pubdate = $('<p/>').html(this.model.pubdate);
		var img = $('<img />').attr('src', this.model.image);

		// $(this.el).append(articleHeader);
		$(this.el).append(title);
		// $(this.el).append(creator);
		$(this.el).append(pubdate);
		$(this.el).append(img);
		$(this.el).append(desc);


		return this;
	}

});


App.AppRouter = Backbone.Router.extend({


	initialize: function() {

		$('#page1').load('index.html', function(event){

			// create listview
			var listView = new App.ArticlesView();

			// render listview
			$(this).html(listView.render().el);

			return false;

		});

		this.firstPage = true;
	}

});

$(document).ready(function () {
    app = new App.AppRouter();
    Backbone.history.start();
});
