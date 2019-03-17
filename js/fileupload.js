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
                    'url': `http://localhost:3000/api/v1/upload`,
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
                $.ajax({
                    'url': `http://localhost:3000/api/v1/upload`,
                    'type': 'POST',
                    'data': {
                        fileName: name,
                        base64: base64
                    },
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
});