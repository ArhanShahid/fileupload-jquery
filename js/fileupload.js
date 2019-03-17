$(() => {


    $(document.body).on('click', '.multipart-file-btn', function () {
        $('#multipart-file-input').click();
    })

    $(document.body).on('click', '.base64-file-btn', function () {
        $('#base64-file-input').click();
    })

    $(document.body).on('change', '#multipart-file-input', function (event) {
        try {
            const file = event.target.files[0];
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                const formData = new FormData();
                formData.append('image', file);
                $('#multipart-file-uploading').show();
                $.ajax({
                    'url': `/images/upload`,
                    'type': 'POST',
                    'data': formData,
                    'contentType': false,
                    'processData': false,
                    'success': function (success) {
                        console.log('ajax success: ', success);
                    },
                    'error': function (error) {
                        console.error('ajax error: ', error);
                    }
                });
            }
        } catch (error) {
            console.error(error);
        }
    });

    $(document.body).on('change', '#base64-file-input', function (event) {
        try {
            const file = event.target.files[0];
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                const base64 = fileReader.result.toString().split(',')[1];
                const name = event.target.files[0].name;
                $('#base64-file-uploading').show();
                console.log(base64);
                console.log(name);
            }
        } catch (error) {
            console.error(error);
        }
    });
});