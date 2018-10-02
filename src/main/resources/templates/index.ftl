<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="renderer" content="webkit">

    <title>卓钢链服务后台</title>

    <meta name="keywords" content="卓钢链管理后台">
    <meta name="description" content="卓钢链后台管理系统">

    <!--[if lt IE 9]>
    <meta http-equiv="refresh" content="0;ie.html" />
    <![endif]-->
    <link id="bootstrap-rtl-link" href="//cdn.zallsteel.com/favicon.ico" rel="stylesheet" />

	<link href="./css/bootstrap.min.css" rel="stylesheet">
    <link href="./css/font-awesome.min.css" rel="stylesheet">
    <link href="./css/animate.css" rel="stylesheet">
    <link href="./css/style.css" rel="stylesheet">
    <link href="./css/proj.css" rel="stylesheet">
</head>

<body class="fixed-sidebar full-height-layout gray-bg" style="overflow:hidden">
    <div id="wrapper">
        <!--左侧导航开始-->
        <nav class="navbar-default navbar-static-side" role="navigation">
            <div class="nav-close"><i class="fa fa-times-circle"></i>
            </div>
            <div class="sidebar-collapse">
                <ul class="nav" id="side-menu">
                    <li class="nav-header">
                        <div class="dropdown profile-element">
                            <span><img alt="image" class="img-circle" src="img/profile_small.jpg" /></span>
                            <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                                <span class="clear">
                               <span class="block m-t-xs"><strong class="font-bold">Beaut-zihan</strong></span>
                                <span class="text-muted text-xs block">超级管理员<b class="caret"></b></span>
                                </span>
                            </a>
                            <ul class="dropdown-menu animated fadeInRight m-t-xs">
                                <li><a class="J_menuItem" href="form_avatar.html">修改头像</a>
                                </li>
                                <li><a class="J_menuItem" href="profile.html">个人资料</a>
                                </li>
                                <li><a class="J_menuItem" href="contacts.html">联系我们</a>
                                </li>
                                <li><a class="J_menuItem" href="mailbox.html">信箱</a>
                                </li>
                                <li class="divider"></li>
                                <li><a href="login.html">安全退出</a>
                                </li>
                            </ul>
                        </div>
                        <div class="logo-element">卓</div>
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-pencil"></i> <span class="nav-label">审批管理</span><span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level">
                            <li><a class="J_menuItem" href="/zall/chain/purchase/protocol/queryApproveUI">框架协议合同审批</a></li>
                            <li><a class="J_menuItem" href="/zall/chain/purchase/protocol/queryChangeApproveUI">框架协议合同变更审批</a></li>
                            <li><a class="J_menuItem" href="/zall/chain/purchase/contract/list?businessType=1">新增合同审批</a></li>
                            <li><a class="J_menuItem" href="/zall/chain/purchase/contract/list?businessType=3">合同变更审批</a></li>
                           <li><a class="" href="#"><span class="nav-label">合同结转审批</span><span class="fa arrow"></span></a>
                            	<ul class="nav nav-third-level">
	        						<li><a class="J_menuItem" href="/zall/chain/purchase/contractOutSettleTransfer/goAuditPage">上家合同结转-已结算</a></li>
	        						<li><a class="J_menuItem" href="/zall/chain/purchase/contractOutTransfer/goAuditPage">上家合同结转-执行中</a></li>
	        						<li><a class="J_menuItem" href="/zall/chain/purchase/contractSettleTransfer/goAuditPage">下家合同结转-已结算</a></li>
	        						<li><a class="J_menuItem" href="/zall/chain/purchase/assureInTransfer/goAuditPage">下家合同结转-执行中</a></li>
    							</ul>
    						</li>
                            <li><a class="J_menuItem" href="approve/contract_new.html">帮融入库审批</a></li>
                            <li><a class="J_menuItem" href="/zall/chain/purchase/contract/inUnpen/queryApproveUI">释放保证金审批</a></li>
                            <li>
                                <a>合同结算审批<span class="fa arrow"></span></a>
                                <ul class="nav nav-third-level">
                                    <li><a class="J_menuItem" href="/zall/chain/purchase/settleSupplier/audit/list">上家合同结算审批</a></li>
                                    <li><a class="J_menuItem" href="/zall/chain/purchase/settleCustomer/queryApproveUI">下家合同结算审批</a></li>
                                </ul>
                            </li>
                            <li><a class="J_menuItem" href="/zall/chain/purchase/contractOutPay/queryApproveUI">下家退款审批</a></li>
                            <li>
                                <a>合同付款审批<span class="fa arrow"></span></a>
                                <ul class="nav nav-third-level">
                                    <li><a class="J_menuItem" href="/zall/chain/purchase/contractOutPay/audit/list?payPurpose=1">货款审批</a></li>
                                    <li><a class="J_menuItem" href="/zall/chain/purchase/contractOutPay/audit/list?payPurpose=3">运费审批</a></li>
                                    <li><a class="J_menuItem" href="/zall/chain/purchase/contractOutPay/audit/list?payPurpose=4">仓储费审批</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-paper-plane"></i> <span class="nav-label">风控管理</span><span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level">
                            <li><a class="J_menuItem" href="approve/contract_new.html">合同风险预警列表</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-bar-chart"></i> <span class="nav-label">级差管理</span><span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level">
                            <li><a class="J_menuItem" href="approve/contract_new.html">级差列表</a></li>
                            <li><a class="J_menuItem" href="approve/contract_new.html">级差模板管理</a></li>
                            <li><a class="J_menuItem" href="approve/contract_new.html">价格计算</a></li>
                            <li><a class="J_menuItem" href="approve/contract_new.html">价格指数列表</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-clipboard"></i> <span class="nav-label">合同管理</span><span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level">
                            <li><a class="J_menuItem" href="/zall/chain/purchase/protocol/list">框架协议列表</a></li>
                            <li><a class="J_menuItem" href="/zall/chain/purchase/contract/list?businessType=0">合同申请列表</a></li>
                            <li><a class="J_menuItem" href="/zall/chain/purchase/contract/list?businessType=2">卓团购合同列表</a></li>
                            <li><a class="J_menuItem" href="/zall/chain/purchase/contract/list?businessType=5">卓帮融合同列表</a></li>
                            <li><a class="J_menuItem" href="/zall/chain/purchase/contractReport/list">执行中合同报表</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-file-text-o"></i> <span class="nav-label">提货订单管理</span><span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level">
                            <li><a class="J_menuItem" href="approve/contract_new.html">订单管理</a></li>
                            <li><a class="J_menuItem" href="approve/contract_new.html">提货申请</a></li>
                            <li><a class="J_menuItem" href="approve/contract_new.html">实提录入</a></li>
                            <li><a class="J_menuItem" href="approve/contract_new.html">变更提货申请</a></li>
                            <li><a class="J_menuItem" href="approve/contract_new.html">终止出库审核</a></li>
                            <li><a class="J_menuItem" href="approve/contract_new.html">退货申请列表</a></li>
                            <li><a class="J_menuItem" href="approve/contract_new.html">我的开票申请</a></li>、
                        </ul>
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-database"></i> <span class="nav-label">结算出库管理</span><span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level">
                            <li><a class="J_menuItem" href="approve/contract_new.html">新增结算出库</a></li>
                            <li><a class="J_menuItem" href="approve/contract_new.html">结算出库申请列表</a></li>
                            <li><a class="J_menuItem" href="approve/contract_new.html">我的开票申请</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-archive"></i> <span class="nav-label">库存管理</span><span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level">
                            <li><a class="J_menuItem" href="approve/contract_new.html">卓团购入库通知单（统一放置库存系统）</a></li>
                            <li><a class="J_menuItem" href="approve/contract_new.html">库存物资明细列表</a></li>
                            <li><a class="J_menuItem" href="approve/contract_new.html">入库明细列表</a></li>
                            <li><a class="J_menuItem" href="approve/contract_new.html">出库实提明细</a></li>
                            <li><a class="J_menuItem" href="approve/contract_new.html">物资调整</a></li>
                            <li><a class="J_menuItem" href="approve/contract_new.html">待调整清单</a></li>
                            <li><a class="J_menuItem" href="approve/contract_new.html">卓团购入库通知单（统一放置库存系统）</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-credit-card"></i> <span class="nav-label">财务管理</span><span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level">
							<li><a class="J_menuItem" href="/zall/chain/finance/assign/list">收款分配列表</a></li>
                            <li><a class="J_menuItem" href="approve/contract_new.html">客户还款列表</a></li>
                            <li><a class="J_menuItem" href="/zall/chain/finance/outPay/enterFinancePayOutListView">付款列表</a></li>
                            <li><a class="J_menuItem" href="/zall/chain/purchase/inInvoice/enterGoodsJxpListView">货款进项票列表</a></li>
                            <li>
                                <a class="J_menuItem" href="/zall/chain/finance/ticket/list">（有票）付运费<span class="fa arrow"></span></a>
                                <ul class="nav nav-third-level">
                                    <li><a class="J_menuItem" href="/zall/chain/finance/ticket/applylist">申请付运费</a></li>
                                    <li><a class="J_menuItem" href="/zall/chain/finance/ticket/yunlist">运费付款申请</a></li>
                                </ul>
                            </li>
                            <li><a class="J_menuItem" href="/zall/chain/purchase/inInvoice/enterCarrierAndStorageJxpListView">物流仓储进项票列表</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
        <!--左侧导航结束-->
        <!--右侧部分开始-->
        <div id="page-wrapper" class="gray-bg dashbard-1">
            <div class="row border-bottom">
                <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
                    <div class="navbar-header">
                        <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a>
                        <span class="breadcrumb-container">
                            <span class="breadcrumb__item" aria-current="page">
                                <span class="breadcrumb__inner">
                                    <a href="index_v1.html" class="J_menuItem">首页</a>
                                </span>
                            </span>
                            <span class="breadcrumb__item">
                                <span role="presentation" class="breadcrumb__separator">/</span>
                                <span class="breadcrumb__inner">
                                    <span class="no-redirect"></span>
                                </span>
                            </span>
                            <span class="breadcrumb__item">
                                <span role="presentation" class="breadcrumb__separator">/</span>
                                <span class="breadcrumb__inner">
                                    <span class="no-redirect"></span>
                                </span>
                            </span>
                            <span class="breadcrumb__item">
                                <span role="presentation" class="breadcrumb__separator">/</span>
                                <span class="breadcrumb__inner">
                                    <span class="no-redirect"></span>
                                </span>
                            </span>
                        </span>
                    </div>
                </nav>
            </div>
            <div class="row content-tabs">
                <button class="roll-nav roll-left J_tabLeft"><i class="fa fa-backward"></i>
                </button>
                <nav class="page-tabs J_menuTabs">
                    <div class="page-tabs-content">
                        <a href="javascript:;" class="active J_menuTab" data-id="index_v1.html">首页</a>
                    </div>
                </nav>
            </div>
            <div class="row J_mainContent" id="content-main">
                <iframe class="J_iframe" name="iframe0" width="100%" height="100%" src="" frameborder="0" data-id="" seamless></iframe>
            </div>
            <div class="footer">
                <div class="text-center">&copy; 2018 <a href="javascript:void(0);">上海卓钢链电子商务有限公司.</a>
                </div>
            </div>
        </div>
        <!--右侧部分结束-->
    </div>

    <!-- 全局js -->
    <script src="js/jquery.min.js?v=2.1.4"></script>
    <script src="js/bootstrap.min.js?v=3.3.6"></script>
    <script src="js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
    <script src="js/plugins/layer/layer.min.js"></script>

    <!-- 自定义js -->
    <script src="js/hplus.js?v=4.1.0"></script>
    <script src="//cdn.zallsteel.com/Hplus/js/contabs.js" type="text/javascript" ></script>

    <!-- 第三方插件 -->
    <script src="js/plugins/pace/pace.min.js"></script>
</body>

</html>
