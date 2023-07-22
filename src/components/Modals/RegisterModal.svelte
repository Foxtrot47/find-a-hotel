<script>
    import Fa from "svelte-fa";
    import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
    import Modal from "./Modal.svelte";
    import { ModalOpened } from "../../stores/RegisterModal";

    let isLoading = false;

    function RegisterClosed() {
        ModalOpened.set(false);
    }
    function onSubmit(){
        return;
    }
</script>

<svelte>
    <Modal 
        actionLabel="Continue"
        disabled={isLoading}
        isOpen={$ModalOpened}
        onClose={RegisterClosed}
        {onSubmit}
        title="Register"
    />
</svelte>