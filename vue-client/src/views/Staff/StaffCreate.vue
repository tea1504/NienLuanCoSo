<template>
  <div>
    <b-card
      header="Thêm mới nhân viên"
      header-class="h1 font-weight-bold bg-gradient-teal"
    >
      <b-form-group
        label="Họ lót :"
        label-cols-sm="2"
        label-cols-lg="1"
        label-align="left"
        label-align-sm="right"
        label-class="font-weight-bold"
      >
        <b-form-input
          type="text"
          id="first_name"
          placeholder="Ví dụ: Trần Văn"
          v-model="staff.first_name"
          :state="true"
          aria-describedby="first_name_err"
        ></b-form-input>
        <b-form-invalid-feedback id="first_name_err">
          alo
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        label="Tên :"
        label-cols-sm="2"
        label-cols-lg="1"
        label-align="left"
        label-align-sm="right"
        label-class="font-weight-bold"
      >
        <b-form-input
          type="text"
          id="last_name"
          placeholder="Ví dụ: Hòa"
          v-model="staff.last_name"
          :state="false"
          aria-describedby="last_name_err"
        ></b-form-input>
        <b-form-invalid-feedback id="last_name_err">
          Enter at least 3 letters
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        label="Bộ phận:"
        label-cols-sm="2"
        label-cols-lg="1"
        label-align="left"
        label-align-sm="right"
        label-class="font-weight-bold"
      >
        <b-form-select
          id="department_id"
          v-model="staff.department_id"
          :state="false"
          :options="[
            { value: 'a', text: 'a' },
            { value: 'b', text: 'b' },
          ]"
          aria-describedby="department_id_err"
        ></b-form-select>
        <b-form-invalid-feedback id="department_id_err"
          >alo</b-form-invalid-feedback
        >
      </b-form-group>
      <b-form-group
        label="Ngày sinh :"
        label-cols-sm="2"
        label-cols-lg="1"
        label-align="left"
        label-align-sm="right"
        label-class="font-weight-bold"
      >
        <b-form-datepicker
          :date-format-options="{
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          }"
          id="date_of_birth"
          v-model="staff.date_of_birth"
          menu-class="w-100"
          calendar-width="100%"
          v-bind="label"
          :state="null"
          aria-describedby="date_of_birth_err"
        ></b-form-datepicker>
        <b-form-invalid-feedback id="date_of_birth_err">
          Enter at least 3 letters
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        label="Số CCCD :"
        label-cols-sm="2"
        label-cols-lg="1"
        label-align="left"
        label-align-sm="right"
        label-class="font-weight-bold"
      >
        <b-form-input
          type="text"
          id="identity_card_number"
          placeholder="Nhập dãy 12 chữ số"
          v-model="staff.identity_card_number"
          :state="false"
          aria-describedby="identity_card_number_err"
        ></b-form-input>
        <b-form-invalid-feedback id="identity_card_number_err">
          Enter at least 3 letters
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        label="Số điện thoại :"
        label-cols-sm="2"
        label-cols-lg="1"
        label-align="left"
        label-align-sm="right"
        label-class="font-weight-bold"
      >
        <b-form-input
          type="text"
          id="phone_number"
          placeholder="Nhập dãy 10 chữ số"
          v-model="staff.phone_number"
          :state="false"
          aria-describedby="phone_number_err"
        ></b-form-input>
        <b-form-invalid-feedback id="phone_number_err">
          Enter at least 3 letters
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        label="Địa chỉ :"
        label-cols-sm="2"
        label-cols-lg="1"
        label-align="left"
        label-align-sm="right"
        label-class="font-weight-bold"
      >
        <b-form-input
          type="text"
          id="address"
          placeholder="Ví dụ: Số nhà 89, phố Tô Vĩnh Diễn, phường Khương Trung, quận Thanh Xuân, thành phố Hà Nội."
          v-model="staff.address"
          :state="false"
          aria-describedby="address_err"
        ></b-form-input>
        <b-form-invalid-feedback id="address_err">
          Enter at least 3 letters
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        label="Hình ảnh :"
        label-cols-sm="2"
        label-cols-lg="1"
        label-align="left"
        label-align-sm="right"
        label-class="font-weight-bold"
      >
        <b-form-file
          v-model="staff.image"
          :state="Boolean(staff.image)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          @change="change"
        ></b-form-file>
        <img
          id="output"
          src="http://api.laravel.local:81/api/img/chung/default.png"
          class="mt-2"
          height="150px"
        />
      </b-form-group>
      <b-col offset-sm="2" offset-md="1">
        <b-button @click="submit">Lưu</b-button></b-col
      >
    </b-card>
    <spinner v-if="!isLoaded" />
  </div>
</template>

<script>
import Staff from "../../apis/Staff";
import Spinner from "../../components/Spinner.vue";
export default {
  components: { Spinner },
  data() {
    return {
      staff: {
        department_id: "",
        first_name: "",
        last_name: "",
        date_of_birth: "",
        identity_card_number: "",
        phone_number: "",
        address: "",
        image: "",
      },
      label: {
        weekdayHeaderFormat: "narrow",
        labelPrevDecade: "Mười năm trước",
        labelPrevYear: "Năm trước",
        labelPrevMonth: "Tháng trước",
        labelCurrentMonth: "Tháng hiện tại",
        labelNextMonth: "Tháng sau",
        labelNextYear: "Năm sau",
        labelNextDecade: "Mười năm sau",
        labelToday: "Hôm nay",
        labelSelected: "Ngày đã chọn",
        labelNoDateSelected: "Không có ngày nào được chọn",
        labelCalendar: "Lịch",
        labelNav: "Điều hướng lịch",
        labelHelp: "Sử dụng các phím con trỏ để duyệt ngày tháng",
      },
      isLoaded: true,
      errors: [],
    };
  },
  methods: {
    change(e) {
      this.staff.image = e.target.files[0];
      this.loadFile(e);
    },
    loadFile(e) {
      var output = document.getElementById("output");
      output.src = URL.createObjectURL(e.target.files[0]);
    },
    submit() {
      this.isLoaded = false;
      var formData = new FormData();
      formData.append("department_id", this.staff.department_id);
      formData.append("first_name", this.staff.first_name);
      formData.append("last_name", this.staff.last_name);
      formData.append("date_of_birth", this.staff.date_of_birth);
      formData.append("identity_card_number", this.staff.identity_card_number);
      formData.append("phone_number", this.staff.phone_number);
      formData.append("address", this.staff.address);
      formData.append("image", this.staff.image);
      Staff.create(formData)
        .then((res) => {
          console.log(res);
          this.isLoaded = true;
        })
        .catch((err) => {
          this.isLoaded = true;
        });
    },
  },
};
</script>

<style>
</style>