/**
 * Copyright (c) 2014-2016, CKSource - Frederico Knabben. All rights reserved.
 * Licensed under the terms of the MIT License (see LICENSE.md).
 *
 * Simple CKEditor Widget (Part 1).
 *
 * Created out of the CKEditor Widget SDK:
 * http://docs.ckeditor.com/#!/guide/widget_sdk_tutorial_1
 *
 */

// Register the plugin within the editor.
CKEDITOR.plugins.add( 'article', {
	// This plugin requires the Widgets System defined in the 'widget' plugin.
	requires: 'widget',

	// Register the icon used for the toolbar button. It must be the same
	// as the name of the widget.
	icons: 'article',

	// The plugin initialization logic goes inside this method.
	init: function( editor ) {
		// Register the simplebox widget.

		editor.widgets.add( 'article', {
			// Allow all HTML elements and classes that this widget requires.
			// Read more about the Advanced Content Filter here:
			// * http://docs.ckeditor.com/#!/guide/dev_advanced_content_filter
			// * http://docs.ckeditor.com/#!/guide/plugin_sdk_integration_with_acf
			allowedContent: 'article(!article); header; div(!story) div(!image); h3(!headline); a[!href]; img[!src,alt,title,width,height]; blockquote; figure',

			// Minimum HTML which is required by this widget to work.
			requiredContent: 'article(!article)',//'article(!newsletter)',

			// Define two nested editable areas.
			editables: {

				title: {
					// Define a CSS selector used for finding the element inside the widget element.
					selector: '.headline',
					// Define content allowed in this nested editable. Its content will be
					// filtered accordingly and the toolbar will be adjusted when this editable
					// is focused.
					allowedContent: 'header; a[!href,name,id,class]; br; em;'
				},
				content: {
					selector: '.story',
					allowedContent: 'p; a[!href,name,id,class]; br; ul; ol; li; strong; em; table; tr; td; th; thead; tbody; tfoot; caption; img[!src,alt,title,width,height]; div(!image); blockqoute; figure'
				}/*,
				image: {
					selector: '.image',
					allowedContent: 'div(!image); img;'
				}*/
			},

			// Define the template of a new Simple Box widget.
			// The template will be used when creating new instances of the Simple Box widget.
			template:
				//'<article class="newsletter">' +
					'<article class="article">' +
						'<header><h2 class="headline">Headline</h2></header>' +
						'<div class="story">' +
							//'<div class="image">' +
								//'<figure><img src="" alt="" width="auto" height="200px" /></figure>' +
							//'</div><!-- /.image -->' +
							'<p>Story</p>' +
						'</div><!-- /.story -->' +
					'</article><!-- /.article -->',
				//'</article>',//HELLO!

			// Define the label for a widget toolbar button which will be automatically
			// created by the Widgets System. This button will insert a new widget instance
			// created from the template defined above, or will edit selected widget
			// (see second part of this tutorial to learn about editing widgets).
			//
			// Note: In order to be able to translate your widget you should use the
			// editor.lang.simplebox.* property. A string was used directly here to simplify this tutorial.
			button: 'Article',

			// Check the elements that need to be converted to widgets.
			//
			// Note: The "element" argument is an instance of http://docs.ckeditor.com/#!/api/CKEDITOR.htmlParser.element
			// so it is not a real DOM element yet. This is caused by the fact that upcasting is performed
			// during data processing which is done on DOM represented by JavaScript objects.
			upcast: function( element ) {
				// Return "true" (that element needs to converted to a Simple Box widget)
				// for all <div> elements with a "simplebox" class.
				return element.name == 'article' && element.hasClass( 'article' );
			},

			// DAKIRKWOOD
			dialog: 'article',
			defaults:{className:'no-image'},
			init: function() {
				// var image_align = this.element.$.classList[1];
				var color = this.element.$.classList[1];console.log(this.element.$.classList);

				if( color != 'cke_widget_element' ){
					this.element.color_scheme = color;
					this.setData('color_scheme', color);
				}

			},
			data: function() {console.log(this.data);
				// These are all the possible classes that would need to be removed on each save
				var classes = [
					'no-image',
					'black',
					'white',
					'unt-green',
					'light-green',
					'dark-green',
					'beige',
					'light-brown',
					'dark-brown',
					'light-blue',
					'aqua'
				];
				for(var i = 0; i < classes.length; i++){
					this.element.removeClass( classes[i] );
				}

				if ( this.data.color_scheme ){
					this.element.addClass( this.data.color_scheme);
				}
			}
		} );
		editor.execCommand('article');
		editor.ui.addButton('article',{
			label:'Article',
			command:'article',
			toolbar:'Article',
		});
		CKEDITOR.dialog.add( 'article', this.path + 'dialogs/article.js' );
	}
} );
