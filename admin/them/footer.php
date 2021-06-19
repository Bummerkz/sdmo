<?php
?>

<script src="/admin/them/them.js?1"></script>
<div class="modal fade" id="Modal" tabindex="-1" aria-labelledby="myModalLabel">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel"><?= Dictionary::t('MAIN', 'HEADER')?></h4>
            </div>
            <div class="modal-body">
                <?= Dictionary::t('MAIN', 'IN_WORK')?>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal"><?= Dictionary::t('MAIN', 'CLOSE')?></button>
            </div>
        </div>
    </div>
</div>
</body>
</html>