const { isNumeric } = require("jquery");

var localization = {
    en: {
        title: "Plot Time Series",
        navigation: "Plot Time Series, separate or combined",
        destination: "Variables to plot",
        firstObservation: "Time of first observation e.g.1: enter 1961,1 for January 1961 e.g.2: enter 1961,3 for 3nd  Quarter of 1961, e.g.3: enter 1 for a continuous series",
        frequency: "Number of observations per unit of time e.g.1: enter 12 for one observation for each month of a year, e.g. 2: enter 4 for one observation per quarter, e.g. 3: enter 1 for a  continuous series.",
        label0: "Plot Options",
        separately: "Plot each series separately",
        combine: "Combine series",
        label1: "Transform variables",
        chkboxForTransform: "Natural log",
        label2: "Options for fitted values",
        yaxisLabel: "Y axis label",
        mainTitle: "Main title",
        help: {
            title: "Plot Time Series",
            r_help: "help(plot.ts, package ='stats')",
            body: `
<b>Description</b></br>
Creates time series plot in combined or separately. When combined multiple variables are plotted together, when separate each variable is plotted independently. BSkyPlotSeriesWithCorrelations is a wrapper function that creates a time series object and internally calls plot.ts. 
<br/>
<b>Usage</b>
<br/>
<code> 
BSkyPlotTimeSeries(vars, start, frequency, plot.type="multiple", naturalLogYaxis =TRUE, main ='title', ylab='y axis label', dataset="Dataset1")
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
plot.type: "multiple" for separate and "single" for combined plot.
</li>
<li>
naturalLogYaxis: if TRUE an Y axis is shown as natural log value.
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
For detailed help click on the R icon on the top right hand side of this dialog overlay or run the following command help(plot.ts, package ='stats') by creating a R code chunk by clicking + in the output window
`}
    }
}

class plotTimeSeriesSeparateCombined extends baseModal {
    constructor() {
        var config = {
            id: "plotTimeSeriesSeparateCombined",
            label: localization.en.title,
            modalType: "two",
            RCode: `
BSkyPlotTimeSeries(vars =c({{selected.destination | safe}}), start =c({{selected.firstObservation | safe}}), frequency={{selected.frequency | safe}} ,plot.type="{{selected.groupbox1 | safe}}", naturalLogYaxis ={{selected.chkboxForTransform | safe}}, main ='{{selected.mainTitle | safe}}', ylab='{{selected.yaxisLabel | safe}}', dataset="{{dataset.name}}")
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
                    label: localization.en.firstObservation,
                    placeholder: "",
                    required:true,
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            frequency: {
                el: new input(config, {
                    no: 'frequency',
                    allow_spaces:true,
                    type:"numeric",
                    required:true,
                    label: localization.en.frequency,
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            label0: { el: new labelVar(config, { label: localization.en.label0, h: 5,  style: "mt-1", }) },
            separately: { el: new radioButton(config, { label: localization.en.separately, no: "groupbox1", increment: "separately", value: "multiple", state: "checked", extraction: "ValueAsIs" }) },
            combine: { el: new radioButton(config, { label: localization.en.combine, no: "groupbox1", increment: "combine", value: "single", state: "", extraction: "ValueAsIs" }) },
            label1: { el: new labelVar(config, { label: localization.en.label1, h: 5,  style: "mt-1", }) },
            chkboxForTransform: { el: new checkbox(config, { label: localization.en.chkboxForTransform, no: "chkboxForTransform", extraction: "Boolean" }) },
            yaxisLabel: {
                el: new input(config, {
                    no: 'yaxisLabel',
                    allow_spaces: true,
                    label: localization.en.yaxisLabel,
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: ""
                })
            },
            mainTitle: {
                el: new input(config, {
                    no: 'mainTitle',
                    label: localization.en.mainTitle,
                    placeholder: "",
                    allow_spaces:true,
                    extraction: "TextAsIs",
                    value: "Time Series"
                })
            },
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.destination.el.content, objects.firstObservation.el.content, objects.frequency.el.content, objects.label0.el.content, objects.separately.el.content, objects.combine.el.content, objects.label1.el.content, objects.chkboxForTransform.el.content, objects.yaxisLabel.el.content, objects.mainTitle.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-time_series",
                modal: config.id
            }
        };
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new plotTimeSeriesSeparateCombined().render()