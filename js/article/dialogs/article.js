// JavaScript Document
/**
 * Verifies whether a field value already exists (edit) or if the default value should be used (create).
 */
function verify_value( widget, element, prop ){

	var data = widget.data[prop];

	if(data){
 		return data;
	}
	else{
		return element.getValue();
	}
}


CKEDITOR.dialog.add( 'article', function( editor ) {
    return {
        title: 'Add Article',
        minWidth: 200,
        minHeight: 100,
        contents: [
            {
                id: 'info',
                elements: [
                    {
						id: 'color_scheme',
						type: 'select',
						label: 'Color',
						items: [
							['Black', 'black'],//Values in this list are class names to which CSS rules are applied
							['White', 'white'],
							['UNT Green', 'unt-green'],
							['Light Green', 'light-green'],
							['Dark Green', 'dark-green'],
							['Beige', 'beige'],
							['Light Brown', 'light-brown'],
							['Dark Brown', 'dark-brown'],
							['Light Blue', 'light-blue'],
							['Aqua', 'aqua'],
						],
						'default':'unt-green',
						setup: function( widget ) {
							//this.setValue( widget.data.color_scheme );
							this.setValue( verify_value(widget, this,'color_scheme') );
						},
						commit: function( widget ) {
							widget.setData( 'color_scheme', this.getValue() );
						}
					}

                ]
			}
		]
	};
});
