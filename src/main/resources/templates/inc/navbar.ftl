<div class="navbar">
        <div class="navbar-inner">
            <div class="navbar-container">
                <!-- Navbar Barnd -->
                <div class="navbar-header pull-left">
                    <a href="#" class="navbar-brand">
                        <small>
                            <img src="https://cdn.zallsteel.com/logo.png" alt="" />
                        </small>
                    </a>
                </div>
                <!-- /Navbar Barnd -->

                <!-- Sidebar Collapse -->
                <div class="sidebar-collapse" id="sidebar-collapse">
                    <i class="collapse-icon fa fa-bars"></i>
                </div>
                <!-- /Sidebar Collapse -->
                <!-- Account Area and Settings --->
                <div class="navbar-header pull-right">
                    <div class="navbar-account">
                        <ul class="account-area">
                            <li>
                                <a class="login-area" title="卓钢链首页" href="//mgt.zallsteel.com/" target="_blank">
                                    <section>
                                        <h2><span>卓钢链首页</span></h2>
                                    </section>
                                </a>
                            </li>
                            <!-- <li>
                                <a href="#" title="Help" class="wave in">
                                    <i class="icon fa fa-envelope"></i>
                                    <span class="badge">3</span>
                                </a>
                            </li> -->
                            <li class="">
                                <a class="login-area dropdown-toggle" data-toggle="dropdown">
                                    <section>
                                        <h2><span class="profile">您好，<label>${adminContext.name!''}</label></span></h2>
                                    </section>
                                    <i class="fa fa-angle-down f18 white padding-top-5 margin-left-5"></i>
                                </a>
                                <!--Login Area Dropdown-->
                                <ul class="pull-right dropdown-menu dropdown-arrow dropdown-notifications">
                                    <!-- <li><a href="javascript:;">个人档案</a></li>
                                    <li><a href="javascript:;">账号信息</a></li> -->
                                    <li>
                                        <a href="/finance/logout" id="j_logout"> 退出账号</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <div class="setting-container">
                            <label>
                                <input type="checkbox" id="checkbox_fixednavbar" checked />
                                <span class="text">固定头部</span>
                            </label>
                            <label>
                                <input type="checkbox" id="checkbox_fixedsidebar" checked />
                                <span class="text">固定左侧</span>
                            </label>
                            <label>
                                <input type="checkbox" id="checkbox_fixedbreadcrumbs" checked />
                                <span class="text">固定导航器</span>
                            </label>
                            <label>
                                <input type="checkbox" id="checkbox_fixedheader" checked />
                                <span class="text">固定头</span>
                            </label>
                        </div>
                        <!-- Settings -->
                    </div>
                </div>
                <!-- /Account Area and Settings -->
            </div>
        </div>
    </div>
