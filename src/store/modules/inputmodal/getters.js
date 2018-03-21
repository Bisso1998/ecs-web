export default {
    
    getInputModalActionAndData: state =>  state,

    getInputModalTitle: state => {
        switch (state.heading) {
            case 'report_title':
                return '__("report_title")';
            case 'edit_pratilipi_summary':
            	return '__("edit_pratilipi_summary")';
        }
    }
}
