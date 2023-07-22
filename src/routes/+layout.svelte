<script lang="ts">
    import '@fontsource-variable/inter';
    import "../styles/app.css";
    import Modal from '../components/Modals/Modal.svelte';
    import Navbar from '../components/Navbar/Navbar.svelte';
	import RegisterModal from '../components/Modals/RegisterModal.svelte';
</script>

<RegisterModal/>
<Navbar/>
<slot></slot>