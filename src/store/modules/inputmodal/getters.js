export default {
    
    getInputModalActionAndData: state =>  state,

    getInputModalTitle: state => {
        switch (state.heading) {
            case 'report_title':
                return '__("report_title")';
            case 'edit_pratilipi_summary':
            	return '__("edit_pratilipi_summary")';
            case 'edit_pratilipi_title':
            	return '__("edit_pratilipi_title")';
        }
    },

    getInputModalSubheadings: state => {
    	switch (state.heading) {
            case 'report_title':
                return ['__("report_title")'];
            case 'edit_pratilipi_summary':
            	return ['__("write_summary")'];
            case 'edit_pratilipi_title':
            	return ['__("writer_input_title")', '__("writer_input_title_en")'];
            default:
            	return []
        }	
    }
}
