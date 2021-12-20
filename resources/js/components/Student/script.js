export default {
    data() {
        return {
            students: {},
            dialog: null,
            student: null,
            showModal: false,
            rout: "",
            form: {
                status: "0",
                id: "",
               email: "",
               password: ""
               
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
        this.allstudent();
    },
    mounted() {
        this.allstudent();
    },
    methods: {
        deletestudent(student) {
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
                  .delete("/deletestudent/" + student.id)
                  .then(function(response) {
                      _this.allstudent();
                  })
                }
              })

            
           },

        Addstudent() {
            var _this = this;

            if (this.form.status == "1") {
                this.rout = "/addstudent";
            } else {
                this.rout = "/editstudent/" + this.form.id;
            }
            axios.post(this.rout, this.form).then(function(response) {
                  swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Estudiante guardado con exito',
                    showConfirmButton: false,
                    timer: 2000
                  })
              
                    _this.form.password = _this.form.email =  "";
                    $("#myModalcarga").modal("hide");
                    _this.allstudent();
              
            });
        },

        showstudent(student) {
          
           this.form.status = "1";
          if (this.form.status) {
              this.form.email = "";
              this.form.password = "";
            
        }

            if (student) {
                this.form.status = "0";
                this.form.email = student.email;
                this.form.password = student.password;
                this.form.id = student.id;
                
            }

            $("#myModalcarga").modal("show");
        },

        allstudent() {
       
            axios
                .post(
                    "/allstudent?page=" + this.pagination.current,

                    {
                        params: {
                            search: this.search
                        }
                    }
                )
                .then(response => {
                    this.students = response.data.data;
                    this.pagination.current = response.data.current_page;
                    this.pagination.total = response.data.last_page;
                });
        },
        onPageChange() {
            this.allstudent();
        },

        find() {
            this.wait = true;
            this.page = 1;
            this.total = 0;
            this.allstudent();
            this.wait = false;
        },
        modal_carga() {
            this.modal = true;
        }
    }
};
