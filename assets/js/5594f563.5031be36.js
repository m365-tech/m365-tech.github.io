"use strict";(self.webpackChunkm_365_tech=self.webpackChunkm_365_tech||[]).push([[356],{1994:e=>{e.exports=JSON.parse('{"archive":{"blogPosts":[{"id":"bulk-change-the-owner-of-power-automate-flows-using-powershell","metadata":{"permalink":"/m365-tech.github.io/bulk-change-the-owner-of-power-automate-flows-using-powershell","source":"@site/blog/2024-07-01-Change-the-owner-of-Power-Automate-flows-using-PowerShell/index.md","title":"Bulk change the owner of Power Automate flows using PowerShell","description":"One of the operational task that many M365 admins is to maintain a current inventory of all Power Automate flows living inside their tenants. The real problem though is everytime a tenant user creates a new flow, tenant admins doesn\'t have the direct access to view/modify those flows. And if that particular user leaves the company there would be an unmonitored flow that may break without anyone being notified.","date":"2024-07-01T00:00:00.000Z","tags":[{"inline":false,"label":"Power Automate","permalink":"/m365-tech.github.io/tags/powerautomate","description":"blog post related to Power Automate"},{"inline":false,"label":"PowerShell","permalink":"/m365-tech.github.io/tags/powershell","description":"blog post related to PowerShell"}],"readingTime":2.575,"hasTruncateMarker":true,"authors":[{"name":"Mark Doria","title":"M365 Engineer","url":"https://github.com/m365-tech","imageURL":"https://github.com/m365-tech.png","key":"markd"}],"frontMatter":{"slug":"bulk-change-the-owner-of-power-automate-flows-using-powershell","title":"Bulk change the owner of Power Automate flows using PowerShell","authors":["markd"],"tags":["PowerAutomate","PowerShell"]},"unlisted":false},"content":"One of the operational task that many M365 admins is to maintain a current inventory of all Power Automate flows living inside their tenants. The real problem though is everytime a tenant user creates a new flow, tenant admins doesn\'t have the direct access to view/modify those flows. And if that particular user leaves the company there would be an unmonitored flow that may break without anyone being notified.\\n\\nIn this post, we will discuss how to add/change the Power Automate Owners using powershell.\\n\x3c!--truncate--\x3e\\n## Pre-requisites\\n:::info\\n\\nAt a minimum, **Power Platform Admin** role is needed to execute the steps below.\\n\\n:::\\n\\n## Manual through UI\\n\\nAs an admin, you can go to [Power Platform Admin](https://pp.cmd.ms) > Environments > Select Environment > Under Resources > Select Flows and you will be presented with all the flows in your environment. You can individually share or enable these flows using this screen.\\n\\n\\n![Power Platform Admin Flow List](./ppadm-flow-list.jpg)\\n\\n## Automate using PowerShell\\n### Install Modules\\n\\nYou first need to install the required modules.\\n\\n```powershell\\nInstall-Module -Name AzureAD -Scope CurrentUser\\nInstall-Module -Name Microsoft.PowerApps.Administration.PowerShell -Scope CurrentUser\\nInstall-Module -Name Microsoft.PowerApps.PowerShell -Scope CurrentUser\\n```\\n\\n### Script Composition\\n\\n#### Define UPN\\n```powershell\\n#Define User Principal Name of the new owner\\n$upn = username@tenant.com\\n```\\n\\n#### Get ObjectID in Azure AD\\nLogin using the Power Platform Admin user account\\n```powershell\\n#Get Object ID of new owner\\nConnect-AzureAd\\n$adUser = Get-AzureAdUser -ObjectID $upn | Select-Object ObjectId\\n```\\n\\n#### Get All FLOWS\\n```powershell\\n#Get ALL flows accessible to Power Platform Admin\\n$flows = Get-AdminFlow\\nWrite-Host -f Magenta \\"$($flows.Count) flows accessible to current user\\"\\n```\\n\\n#### Traverse each flow\\n:::tip\\n\\nEach time we run a **\\"Request sign off\\"** in a SharePoint Library, a new flow is created in the environment (shown [above](./index.md#manual-through-ui)). We don\'t need to change ownership of that flow hence we check the display name when we traverse.\\n\\n:::\\n\\n```powershell\\n#Traverse each flow and add new user as Owner for each\\nforeach ($flow in $flows) {\\n    // highlight-next-line\\n    if ($flow.DisplayName -ne \\"Request sign-off\\") {\\n        Write-Host -f Yellow \\"Adding user $upn to $($flow.DisplayName)\\"\\n        Set-AdminFlowOwnerRole `\\n            -EnvironmentName $flow.EnvironmentName `\\n            -FlowName $flow.FlowName `\\n            -RoleName CanEdit `\\n            -PrincipalType User `\\n            -PrincipalObjectId $adUser.ObjectId\\n        Write-Host -f Green \\"Successfully added $upn to $($flow.DisplayName)\\"\\n    }\\n}\\n```\\n### Combining everything\\n\\nLet\'s combine everything we have\\n:::tip\\n    If you are using solutions in your environment, you need to make the new owner a **System Administrator for each environment**. If not, the script will get an **Error 403: Forbidden**.\\n:::\\n\\n\\n```powershell\\n#Define User Principal Name of the new owner\\n$upn = username@tenant.com\\n\\n#Get Object ID of new owner\\nConnect-AzureAd\\n$adUser = Get-AzureAdUser -ObjectID $upn | Select-Object ObjectId\\n\\n#Get ALL flows accessible to Power Platform Admin\\n$flows = Get-AdminFlow\\nWrite-Host -f Magenta \\"$($flows.Count) flows accessible to current user\\"\\n\\n#Traverse each flow and add new user as Owner for each\\nforeach ($flow in $flows) {\\n    if ($flow.DisplayName -ne \\"Request sign-off\\") {\\n        Write-Host -f Yellow \\"Adding user $upn to $($flow.DisplayName)\\"\\n        Set-AdminFlowOwnerRole `\\n            -EnvironmentName $flow.EnvironmentName `\\n            -FlowName $flow.FlowName `\\n            -RoleName CanEdit `\\n            -PrincipalType User `\\n            -PrincipalObjectId $adUser.ObjectId\\n        Write-Host -f Green \\"Successfully added $upn to $($flow.DisplayName)\\"\\n    }\\n}\\n```"}]}}')}}]);