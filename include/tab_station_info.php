<?php
?>

<div class="control-block">
    <p class="mess alert alert-warning"></p>
    <?php if($USER['type'] < 40) { ?>
        <button type="button" class="btn btn-primary edit"><?= Dictionary::t('INCLUDES', 'EDIT') ?></button>
        <button type="button" class="btn btn-success save"><?= Dictionary::t('INCLUDES', 'SAVE') ?></button>
        <button type="button" class="btn btn-danger cancel"><?= Dictionary::t('INCLUDES', 'CANCEL') ?></button>
    <?php } ?>
</div>
<div class="tables_info"></div>