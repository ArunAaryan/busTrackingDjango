from django.shortcuts import render
from django.http import HttpResponse

def reports(request):
    return render(request, 'reports/reports.html')
    
def deviceuptime(request):
    context={
        'title':'Device Uptime'
    }

    return render(request,  'reports/deviceUptime.html',context)


def alerts(request):
    context = {
        'title':'Alerts'
    }
    return render(request, 'reports/alerts.html', context)

def fleetsummary(request):
    context ={
        'title':'FleetSummary'
    }
    return render(request, 'reports/fleetsummary.html', context)

def fleetreports(request):
    context = {
        'title':'FleetReports'
    }
    return render(request, 'reports/fleetreports.html',context)