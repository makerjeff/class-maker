/**
 * Created by jeffersonwu on 4/1/17.
 */

var AlertModalMaker = {
    /**
     * Create a modal.
     * @param type  Type of modal to create, 'success', 'warning', or 'error'.
     * @param message   Status message.
     * @param target    Target div to append warning to. Generally it's to 'container'.
     */
    create: function(type, message, target) {
        //type options: success, warning, error (determins colors)

        var alert_modal = document.createElement('div');
        var alert_modal_close = document.createElement('div');

        // STYLE
        alert_modal.classList.add('alert_modal');
        alert_modal_close.classList.add('alert_modal_close', 'fa', 'fa-times');

        // TYPE-SWITCHED Additional Syles
        switch(type) {
            case 'success':
                alert_modal.classList.add('type_success');
                break;
            case 'warning':
                alert_modal.classList.add('type_warning');
                break;
            case 'error':
                alert_modal.classList.add('type_error');
                break;
            default:
                return;
        }

        // DATA
        alert_modal.innerHTML = message +' :: ' +  Date.now();

        // APPEND
        alert_modal.appendChild(alert_modal_close);
        target.appendChild(alert_modal);

        // FUNCTIONALITY
        alert_modal_close.addEventListener('click', function(e) {
            alert_modal_close.parentNode.parentNode.removeChild(alert_modal_close.parentNode);
        });
    }
};
