<script lang="ts">
	import '@fontsource-variable/inter';
	import '../styles/app.css';
	import Modal from '../components/Modals/Modal.svelte';
	import Navbar from '../components/Navbar/Navbar.svelte';
	import RegisterModal from '../components/Modals/RegisterModal.svelte';
	import { ToastContainer, FlatToast } from 'svelte-toasts';
</script>

<ToastContainer placement="bottom-right" let:data>
	<FlatToast {data} />
</ToastContainer>
<RegisterModal />
<Navbar />
<slot />
