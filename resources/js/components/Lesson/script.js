export default {
    data() {
        return {
            lessons: {},
            dialog: null,
            lesson: null,
            showModal: false,
            rout: "",
            form: {
                status: "0",
                id: "",
               nombre: "",
               
            },
            datos: null,
            busy: false,
            search: null,
            errors: [],
            pagination: {
                current: 1,
                total: 0
            }
        };
    },

    computed: {},
    created: function() {
        this.alllesson();
    },
    mounted() {
        this.alllesson();
    },
    methods: {
        deletelesson(lesson) {
           
                var _this = this;
                swal.fire({
                    title: 'Estas seguro que quiere eliminar esta informacion',
                    text: "Este proceso no puede ser revertido",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, eliminar!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                       
                    swal.fire({
                       
                       title: 'La informacion ha sido eliminada.',
                        icon: 'success',
                        timer: 2200,
                        showConfirmButton: false,
                     } )
                      axios
                      .delete("/deletelesson/" + lesson.id)
                      .then(function(response) {
                          _this.alllesson();
                      })
                    }
                  })

        },

        Addmateria() {
            var _this = this;

            if (this.form.status == "1") {
                this.rout = "/addlesson";
            } else {
                this.rout = "/editlesson/" + this.form.id;
            }
            axios.post(this.rout, this.form).then(function(response) {
                  swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Materia guardada con exito',
                    showConfirmButton: false,
                    timer: 2000
                  })
                    _this.form.nombre =  "";
                    $("#myModalcarga").modal("hide");
                    _this.alllesson();
               // }
            });
        },

        showlesson(lesson) {
          
           this.form.status = "1";
          if (this.form.status) {
            this.form.nombre = "";
            
        }

            if (lesson) {
                this.form.status = "0";
                this.form.nombre = lesson.name;
                this.form.id = lesson.id;
                
            }

            $("#myModalcarga").modal("show");
        },

        alllesson() {
        
            axios
                .post(
                    "/alllesson?page=" + this.pagination.current,

                    {
                        params: {
                            search: this.search
                        }
                    }
                )
                .then(response => {
                    this.lessons = response.data.data;
                    this.pagination.current = response.data.current_page;
                    this.pagination.total = response.data.last_page;
                });
        },
        onPageChange() {
            this.alllesson();
        },

        find() {
            this.wait = true;
            this.page = 1;
            this.total = 0;
            this.alllesson();
            this.wait = false;
        },
        modal_carga() {
            this.modal = true;
        }
    }
};
