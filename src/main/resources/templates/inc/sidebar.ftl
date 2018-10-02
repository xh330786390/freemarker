<ul class="nav sidebar-menu">
	<li class="home" data-link="home"><a href="/dashboard"> <span class="menu-text f18 padding-left-10 f-blue"> 财务管理 </span> <i class="menu-icon typcn typcn-home" style="display:none;"></i></a> </li>
	
	<li>
		<a href="javascript:void(0);" class="menu-dropdown"><i class="menu-icon fa fa-tasks"></i><span class="menu-text">工作台 </span><i class="menu-expand"></i></a>
		<ul class="submenu">
			<li>
				<a href="javascript:void(0);" class="menu-dropdown"><span class="menu-text">到账单审核</span><i class="menu-expand"></i></a>
				<ul class="submenu submenu1 submenu2" style="display: none;">
				<li data-link="recordsReview_list"> <a href="/zall/finance/recordsReview/list"> <span class="menu-text">修改公司名审核列表</span> </a> </li>
				</ul>
				<a href="javascript:void(0);" class="menu-dropdown"><span class="menu-text">票据审核</span><i class="menu-expand"></i></a>
				<ul class="submenu submenu1 submenu2" style="display: none;">
					
					<li data-link="NoSelfAcceptance_list"><a href="/zall/finance/workBench/NoSelfAcceptance/list"><span class="menu-text">收承兑汇票审核列表</span></a></li>
					<li data-link="Credit_list"><a href="/zall/finance/workBench/Credit/list"><span class="menu-text">收信用证审核列表</span></a></li>
					<li data-link="SelfAcceptance_list"><a href="/zall/finance/workBench/SelfAcceptance/list"><span class="menu-text">开承兑汇票审核列表</span></a></li>
				</ul>
				
			</li>
        </ul>      	
	</li>
	
    <li> <a href="#" class="menu-dropdown"> <i class="menu-icon glyphicon glyphicon-list-alt"></i> <span class="menu-text"> 到账单</span> <i class="menu-expand"></i> </a>
		<ul class="submenu">
			<li data-link="recordsApply_list"> <a href="/zall/finance/recordsApply/list"> <span class="menu-text">到账单申请列表</span> </a> </li>
			<li data-link="records_list"> <a href="/zall/finance/records/list"> <span class="menu-text">到账单列表</span> </a> </li>
			<!--<li data-link="recordsReview_list"> <a href="/zall/finance/recordsReview/list"> <span class="menu-text">到账单审核列表</span> </a> </li>-->
			<li data-link="recordsConfirm_list"> <a href="/zall/finance/recordsConfirm/list"> <span class="menu-text">待确认到账单任务列表</span> </a> </li>
			<li data-link="recordsReexchange_list"> <a href="/zall/finance/recordsReexchange/list"> <span class="menu-text">待处理退汇任务列表</span> </a> </li>
			<li data-link="recordsReversal_list"> <a href="/zall/finance/recordsReversal/list"> <span class="menu-text">待处理冲正任务列表</span> </a> </li>
			<li data-link="recordsTask_list"> <a href="/zall/finance/recordsTask/list"> <span class="menu-text">到账单任务列表</span> </a> </li>
			<li data-link="recordsClose_list"> <a href="/zall/finance/recordsClose/list"> <span class="menu-text">关闭到账单列表</span> </a> </li>
			<li data-link="recordsLog_list"> <a href="/zall/finance/recordsLogController/list"> <span class="menu-text">付款日志</span> </a> </li>
			<li data-link="canCelrecordsLog_list"> <a href="/zall/finance/recordsLogController/cancelList"> <span class="menu-text">取消付款日志</span> </a> </li>
		</ul>
	</li>
	
	
	<li> <a href="#" class="menu-dropdown"> <i class="menu-icon glyphicon glyphicon-tags"></i> <span class="menu-text">票据</span> <i class="menu-expand"></i> </a>
		<ul class="submenu">
			<li data-link="notSelfAcc_list"> <a href="/zall/finance/acceptance/notSelfAcc/list"> <span class="menu-text">收银行承兑汇票列表</span> </a> </li>
			<li data-link="notSelfAcc_tradeAcceptance_list"> <a href="/zall/finance/acceptance/notSelfAcc/tradeAcceptance/list"> <span class="menu-text">收商业承兑汇票列表</span> </a> </li>
            <li data-link="lc_list"><a href="/zall/finance/letterCredit/list"><span class="menu-text">收国内信用证列表</span></a></li>
            <li data-link="selfAcc_list"><a href="/zall/finance/acceptance/selfAcc/list"><span class="menu-text">开银行承兑汇票列表</span></a></li>
            <li data-link="selfAcc_tradeAcceptance_list"><a href="/zall/finance/tradeAcceptance/selfAcc/list"><span class="menu-text">开商业承兑汇票列表</span></a></li>
            <li data-link="dueProceeds_list"><a href="/zall/finance/acceptance/dueProceeds/list"><span class="menu-text">票据收款列表</span></a></li>
            <li data-link="duePay_list"><a href="/zall/finance/acceptance/duePay/list"><span class="menu-text">票据付款列表</span></a></li>
            <li data-link="processTask_list"><a href="/zall/finance/acceptance/processTask/list"><span class="menu-text">票据分配任务列表</span></a></li>
            <li data-link="mandate_list"><a href="/zall/finance/acceptance/mandate/list"><span class="menu-text">银行票据池列表</span></a></li>
            <li data-link="discount_list"><a href="/zall/finance/acceptance/discount/list"><span class="menu-text">票据贴现列表</span></a></li>
            <li data-link="endorseTransfer_list"><a href="/zall/finance/acceptance/endorseTransfer/list?canSelf=0"><span class="menu-text">背书转让</span></a></li>
            <li data-link="payTask_list"><a href="/zall/finance/acceptance/payTask/list"><span class="menu-text">票据支付任务列表</span></a></li>
            <li data-link="acceptanceVou_list"><a href="/zall/finance/acceptance/acceptanceVou/list"><span class="menu-text">票据收据列表</span></a></li>
            <!--<li data-link="paymentRecord_list"><a href="/acceptance/paymentRecord/list.htm"><span class="menu-text">支付记录</span></a></li>
            <li data-link="endorseTransfer_auditList"><a href="/acceptance/notSelfAccVou/auditList.htm?status=0"><span class="menu-text">收据打印审核列表</span></a></li>
            -->
		</ul>
	</li>
	
	<li> <a href="#" class="menu-dropdown"> <i class="menu-icon fa fa-group"></i> <span class="menu-text">财务业务</span> <i class="menu-expand"></i> </a>
		<ul class="submenu">
			<li data-link="reexchange_list"> <a href="/zall/finance/reexchange/list"> <span class="menu-text">银行退汇列表</span> </a> </li>
			<li data-link="reversal_list"> <a href="/zall/finance/reversal/list"> <span class="menu-text">银行冲正列表</span> </a> </li>
			<li data-link="pay_apply_again_list"> <a href="/zall/finance/payApplyAgain/list"> <span class="menu-text">重新付款申请列表</span> </a> </li>
			<li data-link="wrong_list"> <a href="/zall/finance/wrong/list"> <span class="menu-text">错打款项列表</span> </a> </li>
			<li data-link="wrong_back_list"> <a href="/zall/finance/wrong/backApplyList"> <span class="menu-text">错打款项退回列表</span> </a> </li>
		</ul>
	</li>
	
    <li> 
    	<a href="#" class="menu-dropdown"> <i class="menu-icon glyphicon glyphicon-list-alt"></i> <span class="menu-text"> 数据字典</span> <i class="menu-expand"></i> </a>
		<ul class="submenu">
			<li data-link="customer_info"> <a href="/zall/finance/customer/list"> <span class="menu-text">客户信息</span> </a> </li>
		</ul>
	</li>
	
</ul>