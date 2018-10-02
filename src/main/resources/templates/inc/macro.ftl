<#macro pageNation data>
<#if data.pages gt 0 >	
<div class="row DTTTFooter">
	<div class="col-lg-12 col-sm-12 col-xs-12 no-padding-left no-padding-right clearfix">
	<div p_sortinfo="${data.orderBy!''}" p_firstPage="${data.firstPage!''}" p_lastPage="${data.lastPage!''}" p_isFirst=${data.isFirst!''} p_isLast=${data.isLast!''} p_currentpagenum="${data.pageNum!''}" p_totalsize="${data.total!''}" p_endrow="${data.endRow!''}" p_prePage="${data.prePage!''}" p_nextPage="${data.nextPage!''}" p_totalpagesnum="${data.pages!''}" p_pagesize="${data.pageSize!''}" p_startrow="${data.startRow!''}" style="display:none" class="paginator"></div>
	<#if data.pages gt 0 >
		<div class="col-sm-4 col-md-4 col-lg-4">
			<div class="dataTables_info">
				 当前显示 ${data.startRow} 到 ${data.endRow} 条 , 共 ${data.total} 条
				 
		    </div>
		</div>
	</#if> 
 <div class="col-sm-8 col-md-8 col-lg-8" >
	<div class="dataTables_paginate paging_bootstrap">
	 <ul class="pagination">
	  <li class="previous toPrePage"  <#if data.prePage == 0 > pageNum="1" <#else> pageNum="${data.prePage}" </#if>    title="上一页"><a href="javascript:void(0);">上一页</a></li>
	  <#assign $lastPage = data.pageNum - 1 />
	  <#assign $nextPage = data.pageNum + 1 />
	 
	
	 <li <#if data.pageNum ==1 > class="active toTargetPage" <#else> class="toTargetPage" </#if>    pageNum="1"><a href="javascript:void(0);">1</a></li>
	 
	 <#if data.prePage gt 2 >
			<li class="disabledPage"><a href="javascript:void(0);">...</a></li>
	 </#if>	
	 
	 <#list $lastPage .. $nextPage as foo>
	  <#if foo gt 1 && foo lt data.pages >
	    <li <#if data.pageNum == foo > $foo class="active toTargetPage" <#else> class="toTargetPage" </#if> pageNum="${foo}"><a href="javascript:void(0);">${foo}</a></li>
	  </#if>
	</#list>
	 
	 
	 <#if $nextPage+1 lt data.pages >
			<li class="disabledPage"><a href="javascript:void(0);">...</a></li>
	 </#if>	
	 
	 
	 <#if data.pages gt 1 >
	  <li  <#if data.pageNum == data.pages > class="active toTargetPage" <#else> class="toTargetPage" </#if> pageNum="${data.pages}"><a href="javascript:void(0);">${data.pages}</a></li>
	 </#if>	
	 	
	  <li class="next toNextPage" <#if data.pageNum == data.pages > pageNum="${data.pageNum}" <#else> pageNum="${data.nextPage}" </#if> title="下一页"><a href="javascript:void(0);">下一页</a></li>
	  <li class="margin-left-5 margin-right-5 span32">第</li>
	  <li><input id="pageNation_pageNum" type="text" class="margin text-center" style="width:60px;height:32px;" onblur="if(!/^[0-9]{0,}[1-9][0-9]{0,}$/.test(this.value)){ this.style.borderColor='red'} else{ this.style.borderColor='#e3e3e3'}"></li>
	  <li class="margin-left-5 margin-right-5 span32">页</li>
	  <li><a href="javascript:void(0);" class="btn btn-default toTargetPageBtn">确 认</a></li>
  </ul>
  </div>
 </div>
 </div>
 </div>
 </#if>

</#macro>

<#macro checkAccType data><#if data??&&data.accInfo??&&data.accInfo.accType??><#if data.accInfo.accType == 0>银行<#elseif data.accInfo.accType == 1>商业</#if><#else>
	-
	</#if>
</#macro>

<#macro select2 list id>
	<select id="${id!''}" name="${id!''}" class="x-select2 control-label">
		<option></option>
		<#list list as item>
			<option value="${item.id}">${item.companyName}</option>
		</#list>
	</select>
</#macro>
