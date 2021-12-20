export default {
    data() {
        return {
            studentslessons: {},
            dialog: null,
            studentlesson: null,
            showModal: false,
            rout: "",
            form: {
                status: "0",
                id: "",
               email: "",
               password: "",
               id_lesson: "",
               id_student:""
               
            },
            get_lesson:null,
            get_student: null,
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
        this.allstudent_lesson();
        this.getlesson();
        this.getstudent();
    },
    mounted() {
        this.allstudent_lesson();
        this.getlesson();
        this.getstudent();
    },
    methods: {
        getlesson: function(){
            axios.post('/get_lesson')
                .then(function (response) {
                    this.get_lesson = response.data;
                }.bind(this));
        },
        getstudent: function(){
            axios.post('/get_student')
                .then(function (response) {
                    this.get_student = response.data;
                }.bind(this));
        },
        deletestudentlesson(studentslesson) {
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
                  .delete("/deletestudentlesson/" + studentslesson.id)
                  .then(function(response) {
                      _this.allstudent_lesson();
                  })
                }
              })

            
           },

    Addstudentlesson() {
            var _this = this;

            if (this.form.status == "1") {
                this.rout = "/addstudentlesson";
            } else {
                this.rout = "/editstudentlesson/" + this.form.id;
            }
            axios.post(this.rout, this.form).then(function(response) {
                  swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Se asigno la materia al estudiante correctamente',
                    showConfirmButton: false,
                    timer: 2000
                  })
              
                    _this.form.password = _this.form.email =  "";
                    $("#myModalcarga").modal("hide");
                    _this.allstudent_lesson();
              
            });
        },

        showstudentlesson(studentslesson) {
          
           this.form.status = "1";
          if (this.form.status) {
              this.form.id_student = "";
              this.form.id_lesson = "";
            
        }

            if (studentslesson) {
                this.form.status = "0";
                this.form.id_student = studentslesson.student_id;
                this.form.id_lesson = studentslesson.lesson_id;
                this.form.id = studentslesson.id;
                
            }

            $("#myModalcarga").modal("show");
        },

        allstudent_lesson() {
       
            axios
                .post(
                    "/allstudent_lesson?page=" + this.pagination.current,

                    {
                        params: {
                            search: this.search
                        }
                    }
                )
                .then(response => {
                    this.studentslessons = response.data.data.data;
                    this.pagination.current = response.data.data.current_page;
                    this.pagination.total = response.data.data.last_page;
                });
        },
        onPageChange() {
            this.allstudent_lesson();
        },

        find() {
            this.wait = true;
            this.page = 1;
            this.total = 0;
            this.allstudent_lesson();
            this.wait = false;
        },
        modal_carga() {
            this.modal = true;
        }
    }
};
