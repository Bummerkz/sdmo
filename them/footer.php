<?php
?>

<script src="/js/datepicker/moment.js"></script>
<script src="/js/datepicker/moment-timezone.js"></script>
<script src="/js/datepicker/bootstrap-datepicker.js"></script>
<script src="/js/them.js?<?=VERSIA?><?=date('hisdmY')?>"></script>

<script src="/js/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/annotations.js"></script>
<script src="/js/highcharts-more.js"></script>
<script src="/js/highcharts-exporting.js"></script>


<!-- Modal -->
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