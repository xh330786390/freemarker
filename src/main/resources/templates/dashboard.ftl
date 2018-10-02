
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>财务管理系统</title>
 <#include "/inc/header.ftl"/> 
</head>

<body>
<#include "/inc/loading_container.ftl"/>
<#include "/inc/navbar.ftl"/>  

<!-- Main Container -->
<div class="main-container container-fluid"> 
  <!-- Page Container -->
  <div class="page-container"> 
    <!-- Page Sidebar -->
    <div class="page-sidebar" id="sidebar">
      <!-- Sidebar Menu --> 
       <#include "/inc/sidebar.ftl"/>
      <!-- /Sidebar Menu --> 
    </div>
    <!-- /Page Sidebar --> 
    <!-- Page Content -->
    <div class="page-content"> 
 
      <!-- Page Body -->
	  <div class="page-body">
    </div>
    <!-- /Page Body -->
  </div>
  <!-- /Page Content -->
 </div>
  <!-- /Page Container --> 
  <!-- Main Container --> 
  <#include "/inc/footer.ftl"/> 
</div>


</body>
</html>