
var localization = {
    en: {
        title: "Plot Time Series, with correlations",
        navigation: "Plot Time Series, with correlations",
        destination: "Variables to plot",
        firstObservation: "Time of first observation e.g.1: enter 1961,1 for January 1961 e.g.2: enter 1961,3 for 3nd  Quarter of 1961, e.g.3: enter 1 for a continuous series",
        frequency: "Number of observations per unit of time e.g.1: enter 12 for one observation for each month of a year, e.g. 2: enter 4 for one observation per quarter, e.g. 3: enter 1 for a  continuous series.",
        label0: "Additional plots",
        autocorrelations: "Plot autocorrelations",
        autocovariance: "Plot autocovariance",
        partialcorrelations: "Plot partialcorrelations",
        label2: "Options for fitted values",
        mainTitle: "Main title",
        yaxisLabel: "Y axis label",
        help: {
            title: "Plot Time Series (with correlations)",
            r_help: "help(acf, package='forecast')",
            body: `
<b>Description</b></br>
Creates time series plot with autocorrelations, autocovariance and partial correlations. BSkyPlotSeriesWithCorrelations is a wrapper function that internattu calls acf and/or pacf in the forecast package.
<br/>
<b>Usage</b>
<br/>
<code> 
BSkyPlotSeriesWithCorrelations(vars, start, frequency, plot.type="multiple", naturalLogYaxis =TRUE, main ='title', ylab='y axis label', dataset="Dataset2")
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
vars: selected variables to plot
</li>
<li>
start: Time of first observation should be entered in the format year,month or year,quarter e.g.( if your data is organized in months the 1992,1 for Jan 1992 or if your data is organized in quarters then 1992,1 refers to the first quarter of 1992.
</li>
<li>
frequency: Number of observations in unit time. Example: for monthly there are 12 observation in a year. For quarterly there are 4 observation in a year.
</li>
<li>
autocorrelation: if TRUE an autocorrelation plot will also be generated.
</li>
<li>
autocovariance: if TRUE an autocovariance plot will also be generated.
</li>
<li>
partialautocorrelations: if TRUE an partial autocorrelations plot will also be generated.
</li>
<li>
plot.type: "multiple" for separate and "single" for combined plot.
</li>
<li>
main: main title of the plot
</li>
<li>
ylab: title for the y axis
</li>
<li>
dataset: the name of the dataset from which the vars has been picked.
</li>
</ul>
<b>Package</b></br>
stats</br>
<b>Help</b></br>
For detailed help click on the R icon on the top right hand side of this dialog overlay or run the following command help(acf, package ='forecast') by creating a R code chunk by clicking + in the output window
`}
    }
}

class plotTimeSeriesCorrelations extends baseModal {
    constructor() {
        var config = {
            id: "plotTimeSeriesCorrelations",
            label: localization.en.title,
            modalType: "two",
            RCode: `
require(forecast)
BSkyPlotSeriesWithCorrelations(vars =c({{selected.destination | safe}}), start =c({{selected.firstObservation | safe}}), frequency={{selected.frequency | safe}} ,autocorrelation={{selected.autocorrelations | safe}},autocovariance={{selected.autocovariance | safe}}, partialautocorrelations={{selected.partialcorrelations | safe}}, main ="{{selected.mainTitle | safe}}", ylab="{{selected.yaxisLabel | safe}}", dataset="{{dataset.name}}")
`
        };
        var objects = {
            content_var: { el: new srcVariableList(config) },
            destination: {
                el: new dstVariableList(config, {
                    label: localization.en.destination,
                    no: "destination",
                    filter: "Numeric|Scale",
                    required:true,
                    extraction: "NoPrefix|UseComma|Enclosed",
                }), r: ['{{ var | safe}}']
            },
            firstObservation: {
                el: new input(config, {
                    no: 'firstObservation',
                    allow_spaces:true,
                    required:true,
                    label: localization.en.firstObservation,
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            frequency: {
                el: new input(config, {
                    no: 'frequency',
                    label: localization.en.frequency,
                    allow_spaces:true,
                    required:true,
                    type:"numeric",
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            label0: { el: new labelVar(config, { label: localization.en.label0, h: 5,  style: "mt-1", }) },
            autocorrelations: { el: new checkbox(config, { label: localization.en.autocorrelations, no: "autocorrelations", extraction: "Boolean" }) },
            autocovariance: { el: new checkbox(config, { label: localization.en.autocovariance, no: "autocovariance", extraction: "Boolean" }) },
            partialcorrelations: { el: new checkbox(config, { label: localization.en.partialcorrelations, no: "partialcorrelations", extraction: "Boolean" }) },
            yaxisLabel: {
                el: new input(config, {
                    no: 'yaxisLabel',
                    allow_spaces:true,
                    label: localization.en.yaxisLabel,
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            mainTitle: {
                el: new input(config, {
                    no: 'mainTitle',
                    allow_spaces:true,
                    label: localization.en.mainTitle,
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "Time Series"
                })
            },
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.destination.el.content, objects.firstObservation.el.content, objects.frequency.el.content, objects.label0.el.content, objects.autocorrelations.el.content, objects.autocovariance.el.content, objects.partialcorrelations.el.content, objects.mainTitle.el.content, objects.yaxisLabel.el.content],
            nav: {
                name: localization.en.navigation,
                icon: " icon-time_series_r",
                modal: config.id
            }
        };
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new plotTimeSeriesCorrelations().render()