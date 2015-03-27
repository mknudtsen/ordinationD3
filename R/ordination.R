#' Ordination
#'
#' @import htmlwidgets
#'
#' @export
ordination <- function(samples, samples_size, samples_group, features,
                       width=NULL, height=NULL) {

    # forward options using x
    samples_df <- data.frame(samples, samples_size, samples_group)
    x <- list(samples_df=samples_df, features=features, xmax=max(samples[, 1]),
              ymax=max(samples[, 2]), xmin=min(samples[,1]), ymin=min(samples[, 2]),
              rmin=min(samples_size), rmax=max(samples_size))

    # create widget
    htmlwidgets::createWidget(
        name = 'ordination',
        x,
        width = width,
        height = height,
        package = 'ordination'
    )
}

#' Widget output function for use in Shiny
#'
#' @export
ordinationOutput <- function(outputId, width = '100%', height = '400px'){
  shinyWidgetOutput(outputId, 'ordination', width, height, package = 'ordination')
}

#' Widget render function for use in Shiny
#'
#' @export
renderOrdination <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  shinyRenderWidget(expr, ordinationOutput, env, quoted = TRUE)
}
